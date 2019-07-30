Grunddata UML-profilen
=====

Grunddata UML-profilen indeholder stereotyper og tagged values til modellering af grunddata i Sparx Enterprise Architect

# Hvad er en UML-profil?
UML-sproget kan udvides med specialiseringer, som gør det muligt at karakterisere de enkelte elementer på en styret måde. Dette kan for eksempel gøres ved at anvende stereotyper som definerer en bestemt rolle for et element - som for eksempel en klasse eller en attribut - eller ved at tildele ‘tagged values’ som er specielle attributter for UML-elementerne, som har værdier specifikt for de enkelte elementer i modellen.

Eksempel: I grunddatamodellen anvendes stereotypen «DKObjekttype» - se modelregel 5.6: Alle UML-elementer skal tildeles en stereotype. «DKObjekttype» udvider en UML-klasse til at repræsentere et grunddata-forretningsobjekt. Alle forretningsobjekter i modellen skal dokumeteres på en ensartet måde (modelregel 5.9 Datamodellen skal dokumenteres). Derfor specificerer stereotypen «DKObjekttype» et antal tagged values til dokumentation eller metadata: definition, note, alternativt navn, lovgrundlag og eksempel.

Disse tagged values har specifikke værdier for hver forekomst af et forretningsobjekt i modellen (model-metadata opbevares altså i modellen frem for i data).

# En profil kan importeres
Når man har udviklet og distribueret en UML-profil kan disse stereotyper og tagged values importeres i en eksisterende model og derved udvide den på en styres, ensartet måde.

Profilen distribueres som del af grunddata MDG teknologien, men kan også downloades og installeres separat i et Enterprise Architect modelprojekt.

Download filen profile.xml nedenfor, og (i EA) åbn Resources view’et (menuen Project| Resources eller alt+6) og højreklik på UML Profiles i Resources træet. Vælg Import Profile og fremfind din downloadede fil. Nu har du stereotyperne tilgængelige i Resources>UML Profiles>Grunddata, hvorfra de kan trækkes ind i diagrammet. Hvis du vil have en toolbox, må du installere MDG teknologien. Det er muligt at det er nødvendigt at højeklikke på et element i profilen og vælge Sync tagged values and constraints, for at få tagged values vist korrekt.
