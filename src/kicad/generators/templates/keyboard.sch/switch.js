module.exports = `
<%
const x = data.x;
const y = data.y;
%>$Comp
L MX_Alps_Hybrid:MX-NoLED K_<%= data.key.id %>
U 1 1 <%= data.key.id %>1
P <%= x %> <%= y %>
F 0 "K_<%= data.key.id %>" H <%= x %> <%= y + 233 %> 60  0000 C CNN
F 1 "KEYSW" H <%= x %> <%= y - 100 %> 60  0001 C CNN
F 2 "MX_Alps_Hybrid:MX-<%= data.key.size.w %>U-NoLED" H <%= x %> <%= y %> 60  0001 C CNN
F 3 "" H <%= x %> <%= y %> 60  0000 C CNN
	1    <%= x %> <%= y %>
	1    0    0    -1
$EndComp
$Comp
L Device:D_Small D_<%= data.key.id %>
U 1 1 <%= data.key.id %>0
P <%= x - 50 %> <%= y + 300 %>
F 0 "D_<%= data.key.id %>" V <%= x + 20 %> <%= y + 200 %> 50  0000 R CNN
F 1 "D" V <%= x - 70 %> <%= y + 200 %> 50  0000 R CNN
F 2 "Diode_SMD:D_SOD-123" H <%= x - 350 %> <%= y + 250 %> 50  0001 C CNN
F 3 "~" H <%= x - 350 %> <%= y + 250 %> 50  0001 C CNN
	1    <%= x - 350 %>  <%= y + 250 %>
	0    -1   -1   0
$EndComp
Wire Wire Line
	<%= x + 150 %> <%= y - 50 %> <%= x + 400 %> <%= y - 50 %>
Wire Wire Line
	<%= x - 50 %> <%= y + 150 %> <%= x - 50 %> <%= y + 200 %>
Connection ~ <%= x + 400 %> <%= y - 50 %>
Connection ~ <%= x - 50 %> <%= y + 400 %>
`;
