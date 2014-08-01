HaTeMiLe-for-JavaScript
=======================
HaTeMiLe is a libary that can convert a HTML code in a HTML code more accessible. Increasing more informations for screen readers, forcing the browsers(olds and newers) show more informations, forcing that mouse events too be accessed by keyboard and more. But, for use HaTeMiLe is need that a correctly semantic HTML code.

## How to Use
1.  Instanciate a new object with HTMLDOMParser interface, setting the HTML code;
2.  Instanciate a new Configuration object;
3.  Instanciate a new object with AccessibleForm, AccessibleImage, AccessibleShortcut, AccessibleTable, AccessibleEvent or AccessibleSelector interface and call yours methods;
4.  Get the HTML code of object with HTMLDOMParser interface.

## Example

    <!DOCTYPE html>
	<html>
		<head>
			<title>HaTeMiLe Tests</title>
			<meta charset="UTF-8" />
		</head>
		<body>
			<h1>HaTeMiLe Tests</h1>
			<!-- Events -->
			<div>
				<h2>Test Events</h2>
				<a href="#" onclick="alert('Alert A')">Alert</a>
				<button onclick="alert('Alert Button')">Alert</button>
				<input type="button" onclick="alert('Alert Input')" value="Alert" />
				<span onclick="alert('Alert Span')" style="background: red;">Alert</span>
				<i onclick="alert('Alert I')">Alert</i>
				<div style="height: 300px; width: 300px; border: 1px solid black"  onclick="alert('Alert Div')">
					Alert
				</div>
				<span onclick="alert('Alert span')" onkeypress="console.log('Console SPAN')" style="background: blueviolet;">Console</span>
				<hr />
				<a href="#" onmouseover="console.log('Over A')" onmouseout="console.log('Out A')">Console</a>
				<button onmouseover="console.log('Over Button')" onmouseout="console.log('Out Button')">Console</button>
				<input type="button" onmouseover="console.log('Over Input')" value="Console" onmouseout="console.log('Out Input')" />
				<span onmouseover="console.log('Over Span')" style="background: red;" onmouseout="console.log('Out Span')">Console</span>
				<i onmouseover="console.log('Over I')" onmouseout="console.log('Out I')">Console</i>
				<div style="height: 300px; width: 300px; border: 1px solid black"  onmouseout="console.log('Out Div')" onmouseover="console.log('Console Div')">
					Console
				</div>
				<span onmouseover="console.log('Over span')" onmouseout="console.log('Out Span')" onfocus="alert('Alert SPAN')" style="background: blueviolet;">Alert</span>
			</div>
			<!-- Forms -->
			<form autocomplete="off" id="form1">
				<h2>Test Forms</h2>
				<label for="field1">Field1</label>
				<input type="text" value="" required="required" id="field1" autocomplete="on" />
				<label>
					Field2
					<div>
						<input type="text" value="" required="required" autocomplete="off" />
					</div>
				</label>
				<label for="field3">Field3</label>
				<textarea required="required" id="field3" autocomplete></textarea>
				<label>
					Field4
					<textarea required="required" autocomplete="none"></textarea>
				</label>
				<label for="field5">Field5</label>
				<select required="required" id="field5">
					<option value="">0</option>
					<option value="1">1</option>
					<option value="2">2</option>
				</select>
				<label>
					Field6
					<select required="required">
						<option value="">0</option>
						<option value="1">1</option>
						<option value="2">2</option>
					</select>
				</label>
				<label for="field7">Field7</label>
				<input type="number" min="0" value="0" max="10" id="field7" />
				<input type="submit" value="Submit" />
			</form>
			<input type="text" value="" required="" form="form1" />
			<!-- Images -->
			<div>
				<h2>Test Images</h2>
				<img src="http://4.bp.blogspot.com/-JOqxgp-ZWe0/U3BtyEQlEiI/AAAAAAAAOfg/Doq6Q2MwIKA/s1600/google-logo-874x288.png" alt="Google Logo" longdesc="http://www.google.com/" usemap="#laram" />
				<img src="https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-xap1/t39.2178-6/851562_329175193877061_87544187_n.jpg" alt="Facebook Logo" usemap="#laram" />
				<img src="http://4.bp.blogspot.com/-JOqxgp-ZWe0/U3BtyEQlEiI/AAAAAAAAOfg/Doq6Q2MwIKA/s1600/google-logo-874x288.png" alt="Google Logo" usemap="#laram2" />
				<img src="https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-xap1/t39.2178-6/851562_329175193877061_87544187_n.jpg" alt="Facebook Logo" usemap="#laram2" />
				<img src="https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-xap1/t39.2178-6/851562_329175193877061_87544187_n.jpg" alt="Facebook Logo" usemap="#laram3" />
				<img src="http://4.bp.blogspot.com/-JOqxgp-ZWe0/U3BtyEQlEiI/AAAAAAAAOfg/Doq6Q2MwIKA/s1600/google-logo-874x288.png" alt="Google Logo" longdesc="http://www.google.com/" usemap="#laram6" />
				<img src="http://4.bp.blogspot.com/-JOqxgp-ZWe0/U3BtyEQlEiI/AAAAAAAAOfg/Doq6Q2MwIKA/s1600/google-logo-874x288.png" alt="Google Logo" longdesc="http://www.google.com/" usemap="#laram7" />
				<map id="laram" name="laram">
					<area shape="rect" href="http://www.google.com/" alt="Google" target="_blank" coords="260,280,395,360" />
					<area shape="rect" href="http://www.facebook.com/" alt="Facebook" coords="222,113,395,148" />
				</map>
				<map id="laram2" name="laram2">
					<area shape="rect" href="http://www.google.com/" target="_blank" coords="260,280,395,360" />
					<area shape="rect" href="http://www.facebook.com/" coords="222,113,395,148" />
				</map>
				<map id="laram4" name="laram4">
					<area shape="rect" href="http://www.google.com/" alt="Google" target="_blank" coords="260,280,395,360" />
					<area shape="rect" href="http://www.facebook.com/" alt="Facebook" coords="222,113,395,148" />
				</map>
				<map id="laram5" name="laram5">
					<area shape="rect" href="http://www.google.com/" target="_blank" coords="260,280,395,360" />
					<area shape="rect" href="http://www.facebook.com/" coords="222,113,395,148" />
				</map>
				<map id="laram6">
					<area shape="rect" href="http://www.google.com/" alt="Google" target="_blank" coords="260,280,395,360" />
					<area shape="rect" href="http://www.facebook.com/" alt="Facebook" coords="222,113,395,148" />
				</map>
				<map name="laram7">
					<area shape="rect" href="http://www.google.com/" alt="Google" target="_blank" coords="260,280,395,360" />
					<area shape="rect" href="http://www.facebook.com/" alt="Facebook" coords="222,113,395,148" />
				</map>
			</div>
			<!-- Shortcuts -->
			<form action="http://www.webplatform.org/">
				<h2>Test Shortcuts</h2>
				<a href="http://www.google.com.br/" title="Go to Google" accesskey="q">Google</a><br />
				<a href="http://www.facebook.com/" accesskey="w">Go to Facebook</a><br />
				<label id="label1">Field1</label>
				<input type="text" value="" aria-labelledby="label1" accesskey="e" /><br />
				<input type="text" value="" aria-label="Field 2" accesskey="r" /><br />
				<input type="image" src="https://octodex.github.com/images/octobiwan.jpg" alt="Octobiwan" accesskey="t" /><br />
				<input type="reset" value="Reset button" accesskey="y" /><br />
				<input type="button" value="Show shortcuts" accesskey="u" onclick="alert('Only in client-side version.');" /><br />
				<input type="submit" value="Subit Button" accesskey="i" /><br />
			</form>
			<!-- Tables -->
			<div>
				<h2>Test Tables</h2>
				<table>
					<thead>
						<tr>
							<th rowspan="3">1</th>
							<th rowspan="2">2</th>
							<th>3</th>
							<td>4</td>
						</tr>
						<tr>
							<th colspan="2">1</th>
						</tr>
						<tr>
							<th>1</th>
							<th>2</th>
							<td>3</td>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td rowspan="2"></td>
							<td></td>
							<th></th>
							<td></td>
						</tr>
						<tr>
							<td colspan="2"></td>
							<td></td>
						</tr>
						<tr>
							<td></td>
							<td></td>
							<td></td>
						</tr>
					</tbody>
				</table>
				<table>
					<tr>
						<th>1</th>
						<td>2</td>
						<th colspan="2">3</th>
					</tr>
					<tr>
						<td>1</td>
						<td colspan="2">2</td>
						<td>3</td>
					</tr>
					<tr>
						<td>1</td>
						<th>2</th>
						<td>3</td>
						<td>4</td>
					</tr>
				</table>
			</div>
			<script type="text/javascript" src="js/common.js"></script>
			<script type="text/javascript" src="js/config.js"></script>
			<script type="text/javascript" src="http://code.jquery.com/jquery-1.11.1.min.js"></script>
			<script type="text/javascript" src="js/hatemile/implementation/AccessibleEventImpl.js"></script>
			<script type="text/javascript" src="js/hatemile/implementation/AccessibleFormImpl.js"></script>
			<script type="text/javascript" src="js/hatemile/implementation/AccessibleImageImpl.js"></script>
			<script type="text/javascript" src="js/hatemile/implementation/AccessibleSelectorImpl.js"></script>
			<script type="text/javascript" src="js/hatemile/implementation/AccessibleShortcutImpl.js"></script>
			<script type="text/javascript" src="js/hatemile/implementation/AccessibleTableImpl.js"></script>
			<script type="text/javascript" src="js/hatemile/util/CommonFunctions.js"></script>
			<script type="text/javascript" src="js/hatemile/util/Configure.js"></script>
			<script type="text/javascript" src="js/hatemile/util/SelectorChange.js"></script>
			<script type="text/javascript" src="js/hatemile/util/jqueryandvanilla/VanillaHTMLDOMElement.js"></script>
			<script type="text/javascript" src="js/hatemile/util/jqueryandvanilla/JQueryHTMLDOMParser.js"></script>
			<script type="text/javascript">
				var configure = new hatemile.util.Configure(config);
				var parser = new hatemile.util.jqueryandvanilla.JQueryHTMLDOMParser(document);

				var accessibleEvent = new hatemile.implementation.AccessibleEventImpl(parser, configure);
				var accessibleForm = new hatemile.implementation.AccessibleFormImpl(parser, configure);
				var accessibleImage = new hatemile.implementation.AccessibleImageImpl(parser, configure);
				var accessibleSelector = new hatemile.implementation.AccessibleSelectorImpl(parser, configure);
				var accessibleShortcut = new hatemile.implementation.AccessibleShortcutImpl(parser, configure);
				var accessibleTable = new hatemile.implementation.AccessibleTableImpl(parser, configure);

				accessibleEvent.fixOnActives();
				accessibleEvent.fixOnHovers();

				accessibleForm.fixRequiredFields();
				accessibleForm.fixRangeFields();
				accessibleForm.fixLabels();
				accessibleForm.fixAutoCompletes();

				accessibleImage.fixLongDescriptions();
				accessibleImage.fixMaps();

				accessibleSelector.fixSelectors();

				accessibleShortcut.fixShortcuts();

				accessibleTable.fixTables();
			</script>
		</body>
	</html>