/**
 * 
 */

		
			function klar(){
				//funktion startes af Body.onload - gør valglisten og knappen grå
				
				$( "button" ).button().css( "font-size", "0.86em" );
				$("#showme").click(function(){
					if ($(this)[0].textContent == " Vis mere "){
					  $(this).text(" Vis mindre ");
					  $("#snak").animate({height: $("#snak").get(0).scrollHeight}, 1000 )
					}
					else
						{
						$(this).text(" Vis mere ");
						 $("#snak").animate({height: "3em" }, 1000 )
						}
					});
						
				 $(".butbox").children().each(function(){
					$(this).prop('disabled',true);
				})
				
				  $( "#foldSelect" ).button({
					      icons: {
					        primary: "ui-icon-carat-1-s"
					      },
					      text: false
					    });
				 $( "#foldSelect" ).css({ width: '1em',height:'1em' });
				 $("#foldSelect").click(function(){
						if ($( "#foldSelect" ).button( "option", "icons" ).primary == "ui-icon-carat-1-s"){
						$( "#foldSelect" ).button( "option", "icons", { primary: "ui-icon-carat-1-n"} );
						$("#selector").animate({height: '700px'}, 1000 )
						}
						else
							{
							$( "#foldSelect" ).button( "option", "icons", { primary: "ui-icon-carat-1-s"} );
							$("#selector").animate({height:'50px' }, 1000 )
							}
						});
			}
				 
			function vaelgalt(){
				$('.selector option').each(function () {  
					$(this).prop('selected', true);});
				}
				function loadXMLDoc(filename) {
					//funktion til indlæsning af xml fra serveren - ikke i brug pt
					if (window.ActiveXObject) {
						xhttp = new ActiveXObject("Msxml2.XMLHTTP");
					} else {
						xhttp = new XMLHttpRequest();
					}
					xhttp.open("GET", filename, false);
					try {
						xhttp.responseType = "msxml-document"
					} catch (err) {
					} // Helping IE11
					xhttp.send("");
					return xhttp.responseXML;
				}

				function indlaes(files) {
					//Indlæs fil som er blevet valgt af filvælger
					var reader = new FileReader()
					$("#badabim").empty();

					reader.onload = function(e) {
						if (e.target.result.search("encoding=\"UTF-8\"?") == -1 || e.target.result.search("encoding=\"UTF-8\"?") > 100){
							alert('filen har ikke encoding=UTF-8 - det kan jeg ikke håndtere - det går sikkert også galt hvis du har danske tegn i elementnavnene - og hvis du ikke har dét, har du ikke brugt de rigtige stereotyper anyways...')
						}
						else
						{
							parser = new DOMParser();
							//lever resultatet som 'XMI'
							XMI = parser.parseFromString(e.target.result,"text/xml");
							//aktiver valgliste og knapper
							$(".butbox").children().each(function(){
								$(this).prop('disabled',false);
							})
							$( "button" ).button( "enable" );
						}
					}

					reader.onerror = function(stuff) {
						console.log("error", stuff)
						console.log(stuff.getMessage())
					}
					//her startes readeren
					reader.readAsText(files[0])
				
					}
				
				

				

				// 
			function koer (){
					//funktionen starter tjeks på basis af valg i valglisten
				//XMI = loadXMLDoc("dyr.xml");
					//tøm rapporten
				$("#badabim").html("<div id='venteregister'><h1>Vi arbejder på sagen</h1><br><img style='left5em;width:75px;' src='vent.gif'/></div>");
				
				//tjek XMI-version selv om det ikke er valgt. Forkert xmi ødelægger mange andre tjeks	
				tjek(XMI,'XMIver');
				//Kald funktionen tjek for hvert valg i valglisten  
				$('#selector option:selected').each(function(index, opt) {tjek(XMI, opt.value)});
				$("#venteregister").remove();
				if (!$("#badabim")[0].innerHTML){
					$("#badabim").html("<h1>Ingen fejl at rapportere!</h1>Det betyder dog ikke at din model er godkendt...")
				}
				}
				
			function tjek(XMI, hvad) {
					//Tjek på baggrund af valg - 'hvad' 
					switch (hvad) {
					
					case 'XMIver':
					//tjek XMI-version
						var delrap = ""
							//tjek om det rigtige NS nævnes i filen
							var ver = XMI.documentElement.innerHTML.search("http://www.omg.org/spec/XMI/20110701")
							if (ver == -1)
							{
								delrap = "<div id=\"div" + hvad + "\" title=\'dooo\'><h2><a target=\"_new\" href=\"http://arkitekturguiden.digitaliser.dk/grunddata-modelregel/5.1\">Regel 5.1:MODELLER SKAL UDARBEJDES SOM UML-KLASSEDIAGRAMMER</a></h2><h3>UML-version skal være 2.4.1 så XMI version skal være 2.4.1</h3><span class=\"fejl\">XMI-version er ikke korrekt - <strong>bemærk, at dette gør andre testresultater utroværdige</strong></span>"
							}
							if ($("#badabim")[0].textContent.search("2.4.1 så XMI") == -1){$("#badabim").append(delrap);}
							appendTooltip (hvad,'250')
							break;
					case 'public':
						// tjek om alle klasser, attributer og associationer har visibility = public
							var delrap = ""
								$(XMI).find("*[visibility]").each(function(){
									//Hvis attributten 'visibility'findes, men ikke har værdien 'Public' - fordi public klasser og attributter savner attributten visibility
									if (this.attributes['visibility'].value != "Public")
										{
											if (this.nodeName == "ownedAttribute"){
												//hvis det er en attribut
												var oevstring = "<li>Klassen <strong>" + this.parentElement.attributes['name'].value + "</strong>s attribut <strong>\'" + this.attributes['name'].value +"\'</strong> har Scope sat til <strong>" + this.attributes['visibility'].value + "</strong> -  det må den ikke!</li>"
												delrap += oevstring;
											}									
											if (this.nodeName == "packagedElement"){
												//hvis det er en klasse
												var oevstring = "<li>Klassen <strong>" + this.attributes['name'].value +"</strong> har Scope sat til <strong>" + this.attributes['visibility'].value + "</strong> -  det må den ikke!</li>"
												delrap += oevstring;
											}
											if (this.nodeName == "role"){
												//hvis det er en realtionsende - relationsender findes i extension og staver public med stort... 
												var endeejerNavn = $(this.parentElement).find("model")[0].attributes['name'].value;
												var connectorNavn = $(this.parentElement.parentElement).find("labels")[0].attributes['mt'].value;
												var sattil = this.attributes['visibility'].value;
												var oevstring = "<li>Relationen <strong>" + connectorNavn +"</strong>s rolle ift. klassen <strong>" + endeejerNavn + "</strong> har Scope sat til <strong>" + sattil + "</strong> -  det må den ikke!</li>"
												delrap += oevstring;
												
											}
										
										}
								})
								if (delrap != ""){
									delrap = "<div id=\"div" + hvad + "\" title=\'dooo\'><h2><a  target=\"_new\" href=\"http://arkitekturguiden.digitaliser.dk/grunddata-modelregel/5.2\">Regel 5.2: UML-MODELLEN SKAL ORGANISERES I PAKKER</a></h2><h3>Element-scope skal være ‘public’</h3><ul>" + delrap + "</ul></div>"
								}
							
							
							$("#badabim").append(delrap);
							appendTooltip (hvad,'250')
						
							break;
					case 'exptype':
							var delrap = ""
								var attributejere = ['uml:Class','uml:DataType']
							
								$(XMI).find("ownedAttribute").each(function(){
									if (_.contains(attributejere, typify(this.parentElement))){
										if ($(this).children('type').length > 0)
										{
											typeref = typereference($(this).children('type'));	
											if (typeref.length == 0 && !this.attributes['association'])
											{	
												var oevstring = "<li>Klassen <strong>" + this.parentElement.attributes['name'].value + "</strong>s attribut <strong>\'" + this.attributes['name'].value +"\'</strong> angiver ikke en type - det skal den!</li>"
												delrap += oevstring;
											}
											else{
												if (typeref.substr(0,5) != "EAID_" && !this.attributes['association']){
													var oevstring = "<li>Klassen <strong>" + this.parentElement.attributes['name'].value + "</strong>s attribut <strong>\'" + this.attributes['name'].value +"\'</strong> angiver sin type som <strong>'" + typeref.substring(typeref.indexOf('_')+1) + "'</strong> -  det skal være en reference til en specificeret type!</li>"
													delrap += oevstring;
												}
											}	
										}
										else{
											var oevstring = "<li>Klassen <strong>" + this.parentElement.attributes['name'].value + "</strong>s attribut <strong>\'" + this.attributes['name'].value +"\'</strong> angiver ikke en type - det skal den!</li>"
											delrap += oevstring;
											}
									}
								})
								
								if (delrap != ""){
									delrap = "<div id=\"div" + hvad + "\" title=\'dooo\'><h2><a  target=\"_new\" href=\"http://arkitekturguiden.digitaliser.dk/grunddata-modelregel/5.4\">Regel 5.4: ATTRIBUTTER OG RELATIONER SKAL MODELLERES FYLDESTGØRENDE</a></h2><h3>Attributter skal modelleres med eksplicit type</h3><ul>" + delrap + "</ul></div>"
								}
							
							
							$("#badabim").append(delrap);
							appendTooltip (hvad,'250')
						
							break;							
					case 'stereo':
						// regel 5.6
						//tjek om elementer har de rette stereotyper
						
						//ext emelnt har 	<properties @stereotype="DKDatatype" 
						//ext.connector har target+ source <role @stereotype="DKEgenskab"
						//ext element/ attribute har <stereotype @stereotype="DKEgenskab"/>
						/*
										<packagedElement xmi:type="uml:Stereotype" xmi:id="Virkning" name="Virkning">
											<generalization xmi:type="uml:Generalization" xmi:id="Virkning_DKEgenskab_generalization" general="DKEgenskab"/>
										</packagedElement>
										
										<packagedElement xmi:type="uml:Stereotype" xmi:id="DKFeaturetype" name="DKFeaturetype">
										<generalization xmi:type="uml:Generalization" xmi:id="DKFeaturetype_Grunddata::DKObjekttype_generalization" general="Grunddata::DKObjekttype"/>
										<ownedAttribute xmi:type="uml:Property" xmi:id="DKFeaturetype-base_Class" name="base_Class" association="Class_DKFeaturetype">
											<type href="http://www.omg.org/spec/UML/20110701/UML.xmi#Class"/>
										</ownedAttribute>
									</packagedElement>
									
									
									<packagedElement xmi:type="uml:Stereotype" xmi:id="Identifikation" name="Identifikation">
									<generalization xmi:type="uml:Generalization" xmi:id="Identifikation_DKEgenskab_generalization" general="DKEgenskab"/>
								</packagedElement>
									
				*/				
				
				var delrap = ""
				var delrapA = ""
				var delrapB = ""
				var delrapC = ""
										//find alle 
					var assocTypes = ['Association','Aggregation','Composition']
				var enumerationStereotyper = ['DKEnumeration','DKKlassifikation','DKKodeliste']
				var elemTypes = ['DKDatatype','DKObjekttype']
				
				$(XMI).find("stereotype").each(function(){
					if (this.attributes.length==0){
						delrapA += "<li>Attributten <strong>" + this.parentElement.attributes['name'].value + "</strong> på klassen <strong>" + this.parentElement.parentElement.parentElement.attributes['name'].value + "</strong> har ingen stereotype - det går vist ikke!</li>"
					}
					else {
						if (this.attributes['stereotype'].value != "DKEgenskab"  && !ExtensionAfGrunddata(this.attributes['stereotype'].value,['DKEgenskab'])){
							delrapA += "<li>Attributten <strong>" + this.parentElement.attributes['name'].value + "</strong> på klassen <strong>" + this.parentElement.parentElement.parentElement.attributes['name'].value + "</strong> har stereotypen <strong>" + this.attributes['stereotype'].value + "</strong> - den skal være «DKEgenskab»!</li>"
							
						}
					}
					});
				if (delrapA != ""){
					delrap = "<li>Attributter<ul>" + delrapA + "</ul></li>"
					}
				
				$(XMI).find("properties").each(function(){
						if (this.parentElement.nodeName == 'element'){
						
							if (this.attributes['sType'].value == 'Class')  {
								if 	(this.attributes['stereotype'] == undefined){
									delrapB += "<li>Klassen <strong>" + this.parentElement.attributes['name'].value + "</strong> har ingen stereotype - det går vist ikke!</li>"
								}
								else {
									if (this.attributes['stereotype'].value != "DKObjekttype" && !ExtensionAfGrunddata(this.attributes['stereotype'].value,['DKObjekttype']) && !privatExtensionAfGrunddata(this.attributes['stereotype'].value,['DKObjekttype'])){
										delrapB += "<li>Klassen <strong>" + this.parentElement.attributes['name'].value + "</strong> har stereotypen <strong>" + this.attributes['stereotype'].value + "</strong> - den skal være «DKObjekttype»!</li>"
									}
								}
						}	
							if (this.attributes['sType'].value == 'Package')  {
								if 	(this.attributes['stereotype'] == undefined){
								delrapB += "<li>Pakken <strong>" + this.parentElement.attributes['name'].value + "</strong> har ingen stereotype - det går vist ikke!</li>"
							}
								else {
									if (this.attributes['stereotype'].value != "DKDomænemodel"&& !ExtensionAfGrunddata(this.attributes['stereotype'].value,['DKDomænemodel'])){
										delrapB += "<li>Pakken <strong>" + this.parentElement.attributes['name'].value + "</strong> har stereotypen <strong>" + this.attributes['stereotype'].value + "</strong> - den skal være «DKDomænemodel»!</li>"
									}
								}
					}	
							if (this.attributes['sType'].value == 'DataType')  { 
								if 	(this.attributes['stereotype'] == undefined){
									delrapB += "<li>Datatypen <strong>" + this.parentElement.attributes['name'].value + "</strong> har ingen stereotype - det går vist ikke!</li>"
								}
								else {
									if (this.attributes['stereotype'].value != "DKDatatype" && !ExtensionAfGrunddata(this.attributes['stereotype'].value,['DKDatatype'])){
										delrapB += "<li>Datatypen <strong>" + this.parentElement.attributes['name'].value + "</strong> har stereotypen <strong>" + this.attributes['stereotype'].value + "</strong> - den skal være «DKDatatype»!</li>"
									}
								}
						}							
							if (this.attributes['sType'].value == 'Enumeration')  { 
								if 	(this.attributes['stereotype'] == undefined){
								delrapB += "<li>Det enumeration-agtige element <strong>" + this.parentElement.attributes['name'].value + "</strong> har ingen stereotype - det går vist ikke!</li>"
							}
								else {
									if (!_.contains(enumerationStereotyper, this.attributes['stereotype'].value)&& !ExtensionAfGrunddata(this.attributes['stereotype'].value,enumerationStereotyper)){
										delrapB += "<li>Det enumeration-agtige element <strong>" + this.parentElement.attributes['name'].value + "</strong> har stereotypen <strong>" + this.attributes['stereotype'].value + "</strong> - den skal være enten «DKEnumeration», «DKKodeliste» eller «DKKlassifikation»!</li>"
									}
								}
					}
						}

					});
					if (delrapB != ""){
						delrap = delrap + "<li>Pakker og klasser<ul>" + delrapB + "</ul></li>"
						}
					
				$(XMI).find("role").each(function(){
					//er associationens slags i listen over relevante associationer ['Association','Aggregation','Composition']?
					if (_.contains(assocTypes, $(this.parentElement.parentElement).find("properties")[0].attributes['ea_type'].value )){
						if 	(this.attributes['stereotype'] == undefined){
							delrapC += "<li>En associationsende (association af typen <strong>" + $(this.parentElement.parentElement).find("properties")[0].attributes['ea_type'].value + "</strong>) ved elementet <strong>" + $(this.parentElement).find("model")[0].attributes['name'].value + "</strong> har ingen stereotype - det går vist ikke!</li>"
						}	
						else {
							if (this.attributes['stereotype'].value != "DKEgenskab") {
							delrapC += "<li>En associationsende (association af typen <strong>" + $(this.parentElement.parentElement).find("properties")[0].attributes['ea_type'].value + "</strong>) ved elementet <strong>" + $(this.parentElement).find("model")[0].attributes['name'].value + "</strong> har stereotypen <strong>" + this.attributes['stereotype'].value + "</strong> - det skal være «DKEgenskab»!</li>"
							}
						}
	
					}

				});
				if (delrapC != ""){
					delrap = delrap + "<li>Asociationer<ul>" + delrapC + "</ul></li>"
					}
								
					
					
					if (delrap != ""){
						delrap = "<div id=\"div" + hvad + "\" title=\'dooo\'><h2><a  target=\"_new\" href=\"http://arkitekturguiden.digitaliser.dk/grunddata-modelregel/5.6\">Regel 5.6: UML-STEREOTYPER SKAL ANVENDES</a></h2><h3>Alle UML-elementer skal tildeles en UML-stereotype</h3><ul>" + delrap + "</ul></div>"
					
					}
				
				
				$("#badabim").append(delrap);
				appendTooltip (hvad,'3000')
				
						break;
					case 'dokutags': 
						//regel 5.9
						//tjek om modellen er dokumenteret - dvs om tagged value 'definition' er udfyldt	
						//<attribute har tags/tag med name=def, med eller uden  value
						//<element har tags/tag med name=def, value= evt værdi + #NOTES#D
						//<connector har source og target med tags/tag med value = værdi + $ea_notes=
					
						var delrap = ""
						//find alle 
						$(XMI).find("tag[name='definition']").each(function(){
							forfader = this.parentElement.parentElement.tagName;
							if (forfader == "attribute"){
								if (this.attributes['value'] == undefined || this.attributes['value'].value.length == 0 ) {		
										var oevstring = "<li>Attributten <strong>" + this.parentElement.parentElement.attributes['name'].value + "</strong> savner indhold i tagget 'definition' -  det må den ikke!</li>"
										delrap += oevstring;
										}
				
							}
							if (forfader == "element"){
								if (this.attributes['value'] == undefined || this.attributes['value'].value.indexOf('#NOTES#') == 0){
									var oevstring = "<li>Klassen <strong>" + this.parentElement.parentElement.attributes['name'].value + "</strong> savner indhold i tagget 'definition' -  det må den ikke!</li>"
									delrap += oevstring;
								}
							}
							if (forfader == "target" || forfader == "source" ){
								if (this.attributes['value'] == undefined || this.attributes['value'].value.indexOf('$ea_notes') == 0){
									var oevstring = "<li>Relationsenden <strong>" + this.parentElement.parentElement.nodeName + "</strong> på relationen <strong>" + $(this.parentElement.parentElement.parentElement).find("labels")[0].attributes['mt'].value + "</strong> savner indhold i tagget 'definition' -  det må den ikke!</li>"
									delrap += oevstring;
								}
							}
							
						})
						
						
						if (delrap != ""){
							delrap = "<div id=\"div" + hvad + "\" title=\'dooo\'><h2><a  target=\"_new\" href=\"http://arkitekturguiden.digitaliser.dk/grunddata-modelregel/5.9\">Regel 5.9: DATAMODELLEN SKAL DOKUMENTERES</a></h2><h3>Klasser, attributter og roller/associationsender dokumenteres ved brug af tagged value</h3><ul>" + delrap + "</ul></div>"
						
						}
					
					
					$("#badabim").append(delrap);
					appendTooltip (hvad,'6000')
					break;
					case 'dokumenter':
						var dokumeteredeElementer = ['uml:Class','uml:Enumeration','uml:DataType','uml:Package']
						var dokumeteredeRelationer = ['Association','Aggregation','Composition']
							
						//Udskriv dokumentations tagged values
							var delrap = "<div id=\"div" + hvad + "\" title=\'dooo\'><h2>Dokumentationstags:</h2>"
								$(XMI).find("element").each(function(){
									elementtype =typify(this)
									if (_.contains(dokumeteredeElementer,elementtype))
										{
									delrap+= "<h3>" + elementtype + ":" + this.attributes['name'].value + "</h3>"
									delrap+= "<blockquote><blockquote>"
									delrap+= printtags(this,"#NOTES#");
								
									delrap+= "</blockquote>"
									
									$(this).find("attribute").each(function(){
										delrap+=  "<h4>" + this.attributes['name'].value + "</h4><blockquote>"
										delrap+= printtags(this,"#NOTES#");
										delrap+= "</blockquote>";
									})
									delrap+= "</blockquote>"
										}
									
								});
									
					$(XMI).find("connector").each(function(){
						var connType = ($(this).children('properties')[0].attributes['ea_type'])?$(this).children('properties')[0].attributes['ea_type'].value:"";
						if (_.contains(dokumeteredeRelationer,connType)){
							
							var navn = ($(this).children('labels')[0].attributes['mt'])?$(this).children('labels')[0].attributes['mt'].value:"";
							var alias = ($(this).children('style')[0].attributes['value'])?$(this).children('style')[0].attributes['value'].value:"";
							delrap+= "<h3>Connector:" + connType + ":" + navn + " (" + alias + ")</h3>"
							delrap+= "<blockquote>"
							$(this).find("source,target").each(function(){
									rollenavn = ($(this).children('role')[0].attributes['name'])?$(this).children('role')[0].attributes['name'].value:"---";
								delrap+=  "<h4>" + rollenavn + "</h4><blockquote>"
								delrap+= printtags(this,"$ea_notes");
								delrap+= "</blockquote>";
							})
							delrap+= "</blockquote>"
								
						}
						
					})
									$("#badabim").append(delrap);
									appendTooltip (hvad,'6000')
								break;

					}
				}
			
			function printtags (classifier,notedelimiter){
				raprap = ""
				$(classifier).children('tags').children('tag').each(function(){
					//valueStr =  (this.attributes['value'])?this.attributes['value'].value:""; 
					//valueStr = valueStr.replace("\<memo\>", "")
					//bemærk: <tag xmi:id="EAID_003E3936_A267_18a2_AFF2_5EBC7A39D6BD" name="note" value="&lt;memo&gt;" notes="Er kun til stede i objekter med attributten &quot;bebyggelsestype&quot; = &quot;by&quot; eller &quot;bebyggelsestype&quot; = &quot;sommerhusområde&quot;. Benyttes i kommunikation mellem Geodatastyrelsen og Danmarks Statistik. Koden tildeles af Geodatastyrelsen. Værdierne 10.000-69.999 tildeles objekter med attributten &quot;bebyggelsestype&quot; = &quot;by&quot;. Værdierne 70.000 - 99.999 tildeles objekter med attributten &quot;bebyggelsestype&quot; = &quot;sommerhusområde&quot;."/>
					saereNotes = (this.attributes['notes'] && (this.attributes['notes'].value.substring(0,12) != "Description:"))?this.attributes['notes'].value:"";
					interessantStr = ((this.attributes['value'])?this.attributes['value'].value:"").replace("\<memo\>", "").split(notedelimiter, 1)[0]
					if (interessantStr.length > 0 || saereNotes.length > 0)
						{
						raprap+= "<strong>" + this.attributes['name'].value + "</strong>:" +interessantStr + saereNotes + "<br/>"
						}
				})
				return raprap;
			}
			function typify(element){
				var imp = ""
				$(element.attributes).each(function(){
					if (this.localName == 'type' ){
						imp = this.value;
					}
				})
				return imp;
			}
			
			function typereference(element){
				var imp = ""
					$(element[0].attributes).each(function(){
						if (this.localName == 'idref' ){
							imp = this.value;
						}
					})
					return imp;
				}
			
			function ExtensionAfGrunddata(STNavn,allowed){
				//tjek om stereotypen er en af Grunddata-profil udvidelserne af stereotyper - Virkning, Registrering, Status Identifikation extender DKEgenskab for attributter
					var OK = false
					$(XMI).find("packagedElement[name=" + STNavn + "]").each(function(){
						//hvis attributten general findes, er det en stereotype-extender
						if ($(this).children('generalization').attr('general')){
							//hvis 
							var general = $(this).children('generalization').attr('general');
							var pakke = general.substring(0,general.indexOf("::"));
							var extendedST = (general.indexOf("::") > -1)?general.substr(general.indexOf("::")+2):general;
							if ( _.contains(allowed,extendedST) && (pakke == "Grunddata" || pakke == ""))
							OK = true;
						}
					}) //.find("packagedElement[name=" + STNavn + "]")
					/*
					$(element.attributes).each(function(){
						if (this.localName == 'type' ){
							imp = this.value;
						}
					})
					*/
					return OK;
				}
			function privatExtensionAfGrunddata(STNavn,allowed){
				//tjek om stereotypen er en af Grunddata-profil udvidelserne af stereotyper - Virkning, Registrering, Status Identifikation extender DKEgenskab for attributter
					var OK = false
					//.find("packagedElement[name=" + STNavn + "]")
					/*
					$(element.attributes).each(function(){
						if (this.localName == 'type' ){
							imp = this.value;
						}
					})
					*/
					return OK;
				}
			function appendTooltip (hvad,delay){
				/*$( "#div" + hvad ).tooltip({ 
					content: $("#tool" + hvad)[0].innerHTML ,  
					hide: {
						        effect: "explode",
						        delay: delay
						      }
					});
			*/
			}