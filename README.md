# grunddata-model-rules-tool-support
Tool Support for Grunddata Modelling Rules
======


Grunddata MDG-teknologien indeholder de byggesten, som man skal bruge for at lave en grunddatamodel - stereotyper, diagrammer og basale datatyper.
MDG (Model Driven Generation) teknologier er Sparx Enterprise Architect’s måde at håndtere ‘plug-ins’ med samlinger af værktøjer til en specifik modelleringsopgave.

Grunddata MDG indeholder det meste af det, der skal til for at starte et grunddatamodelleringsprojekt. Lidt mere af det der skal til, findes i grunddata-projekt-filen.


Grunddata MDG har følgende indhold:
* Grunddata UML-profilen - se her - som indeholder de nødvendige grunddata-stereotyper, som nævnes i modelregel 5.6: Alle UML-elementer skal tildeles en stereotype
* Tool-bokse, som indeholder ikoner til indsætning af stereotypede elementer i diagrammer
* Diagram-definitioner, som basis for de mest almindelige diagrammer
* Mønstre - grydeklare UML-klasser med alle de krævede attributter

Hvordan arbejder jeg med grunddata MDG teknologien?

Man kan komme i gang med grunddatateknologien ved at starte sit projekt på baggrund af filen Grunddata-projekt.eap eller ved at importere teknologien i et eksisterende projekt.


# Import af grunddata-teknologi:
Filen GrunddataMDG.xml downloades fra denne side, og placeres et sted, hvor den kan findes igen.

I et eksisterende EA-projekt vælges menuen Tools | MDG Technology Import. Der browses efter filen GrunddataMDG.xml.

Man skal vælge om teknologien skal importeres i den aktuelle model/projekt eller generelt være tilgængelig.

Af uransagelige årsager skal teknologien importeres "to user" for at danske tegn understøttes

I et projekt med teknologien installeret
Hvadenten man har importeret teknologien i et eksisterende projekt eller arbejder ud fra Grunddata-projekt.eap, har man nu de samme muligheder:

Man kan:

# Oprette et grunddata-diagram
* Arbejde med grunddata-stereotypede elementer
* Arbejde med mønstre
* Mønstret Klasse
* Mønstret Mønster
* Udskrive dokumentation
* Oprette et grunddata-diagram

Når man vil oprette et nyt diagram vælger man i dialogen “New Diagram” i “Select from:” Grunddata. Så fremkommer de fire prædefinerede diagramtyper:

* Et pakkediagram
* Tre forskellige klassediagrammer
* Et, som hverken viser stereotyper eller tagged values
* Et, som viser stereotyper på alle stereotypede elementer
* Et, som dertil viser klassernes Tagged values - der hvor modellens metadata jo findes

De tre forskellige klassediagrammer afspejler indstillinger for synlighed af forskellige egenskaber, som også kan styres fra et diagrams Properties-dialog (dobbeltklik på diagrammets baggrund)

Den væsentligst fordel ved at vælge grunddata-diagrammerne er, at man så automatisk får grunddata-toolboksen frem.

# Arbejde med grunddata-stereotypede elementer
Toolboksene indeholder ikoner for de stereotypede elementer, som kræves i regel 5.6.

Når disse elementer anvendes, er de udstyret med “tagged values” til dokumentation som beskrevet i regel 5.10 - Datamodellen skal dokumenteres.

Et fif:menuen View  | Tagged values eller (ctl+shift+6) åbner et vindue, hvor man kan se og redigere tags for det valgte element - også for attributter.
Det er muligt, at det er nødvendigt at højeklikke på et ikon i toolboksen og vælge Synchronize Stereotype, for at få tagged values vist korrekt.

Et fif: Bemærk, at en stereotyped attribut kan trækkes direkte fra toolboksen og ind i en klasse.
Desværre har det ikke været muligt, at lave associationsender på association, komposition og aggregering som har den rette stereotype (DKEgenskab). Her må man altså for begge ender af associationen åbne dens dialogboks og vælge Target role og Source role i træet til venstre. Tryk på [...], ud for Stereotype, vælg Profile=Grunddata og sæt hak ved DKEgenskab.

Skulle man have behov for toolboksen på et ikke-grunddata-diagram - eller er den på uforklarlig vis blevet væk - kan den findes ved at trykke på More tools øverst i toolboks området og bevæge sig ned i sektionen med MDG teknologiernes værktøjer. Der findes “Grunddata” med underpunkterne Klassediagram og Pakkediagram.

# Arbejde med mønstre
Grunddata-teknologien indeholder to mønstre - forbagte sammensætninger af klasser og attributter - som kan være nyttige som udgangspunkt for modellen. Mønstrene kan hentes ved at klikke på de to ikoner i toolboks-afsnittet 'Grunddatamønstre'

## Mønstret Klasse
Det ene mønster består af en enkelt klasse (med stereotypen DKObjekttype) som indeholder de attributter som nævnes i modelreglernes afsnit om generelle egenskaber.

Disse attributter har fået tildelt hjælpe-stereotyperne Identifikation, Registrering, Virkning og Status. Disse er specailiseringer af den krævede stereotype DKEgenskab, og tjener primært til at gruppere de mange krævede attributter - de tilføjer ikke anden semantik end deres navn.

Et fif: Hvis man ønsker et forsimplet udseende af sit diagram, kan man skjule de generelle attributter - altså koncentrere sig om de forretningsrelevante - ved, for hvert element, at vælge menuen Element | Feature Visibility (ctrl+shift+Y) og indtaste hjælpe-stereotypernes navne i feltet Hide Stereotyped Features.
Mønstret Mønster
Det andet mønster er en sammenstilling af to klasser, deres statusenumeration og deres relation til Identifikation datatypen

Bemærk, at de anvendte Dependency-pile bare er en visualisering af relationen mellem attributterne id og status og disses typer.

# Udskrive dokumentation
Teknologien indeholder et forslag til en rapport-template. I forbindelse med udarbejdning af dokumentation (F8) kan man i feltet Template vælge Technology Templates -> Grunddatarapport.
