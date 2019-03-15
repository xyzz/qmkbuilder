const fs = require('fs');
const ejs = require('ejs');

const genId = () => `${prefix}${randomHex(2)}`.toUpperCase();

const COMP_COUNTER = Symbol.for("MrKeebs.KbPCB.ComponentCounter");

var globalSymbols = Object.getOwnPropertySymbols(global);
var exists = (globalSymbols.indexOf(COMP_COUNTER) > -1);

if (!exists) {
  global.COMP_COUNTER = {};
}

class Component {
  constructor(type, compName, pads, nets, prefix) {
    const nid = this.getNext();
    const encType = type.split('').reduce((acc, v, i) => acc + type.charCodeAt(i), 0).toString(16);
    this.type = type;
    this.name = compName || `${prefix || type.charAt(0).toUpperCase()}${nid}`;
    this.pads = [];
    this.tstamp = `${encType}${nid.toString(16)}`.toUpperCase();
    this.nets = nets;
    this.initX = Component.options.initX;
    this.initY = Component.options.initY;

    for (let index = 0; index < pads; index++) {
      this.addPad();
    }
  }

  renderTemplate(template, vars) {
    const contents = fs.readFileSync(template, 'utf8');
    return ejs.render(contents, vars);
  }

  getNext() {
    const next = (global.COMP_COUNTER[this.type] || 0) + 1;
    global.COMP_COUNTER[this.type] = next;
    return next;
  }

  addPad(net) {
    const index = this.pads.length;
    const name = net
      ? net
      : `Net-(${this.name}-Pad${index+1})`;
    this.nets.add(name);
    this.pads.push(name);
  }

  setPad(n, pad) {
    this.pads[n-1] = pad;
  }

  netForPad(n) {
    const net = this.pads[n-1];
    return this.nets.get(net);
  }

  pad(n) {
    return this.pads[n-1];
  }

  connectPads(sourcePad, targetComp, targetPad) {
    const targetNet = targetComp.pad(targetPad);
    this.setPad(sourcePad, targetNet);
  }

  getAdditionalData(x, y, rotation) {
    return {};
  }

  render(x, y, rotation) {
    const { id, tstamp, name } = this;
    const netForPad = this.netForPad.bind(this);
    const additionalData = this.getAdditionalData(x, y, rotation);
    const data = Object.assign({ id, tstamp, name, x, y, rotation, netForPad }, additionalData);
    data.x = data.x + Component.options.initX;
    data.y = data.y + Component.options.initY;

    return this.renderTemplate(`${__dirname}/${this.type}.ejs`, { data });
  }
}

Component.options = { initX: 0, initY: 0 };

module.exports = Component;
