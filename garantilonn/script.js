let stilling = ["Velg fra listen","lærer","Adjunkt","Adjunkt m/tilleggsutdanning","Lektor","Lektor m/tilleggsutdanning","Avdelingsleder","Inspektør","Styrer Barnehage","Rektor","Andre ledere/kap 4"];
let ansenitet = ["Ansenitet","2 år","4 år","6 år","8 år","10 år","16 år"];


let lederlonn = ["","","","","","","Avdelingsleder Du tjener alt for bra fy skam seg ","Inspektør Du tjener penger som grass ","Styrer Barnehage Du tjener alt for bra ","Rektor tjener masse","Andre ledere/kap 4"]
let lederstillinger = [6,7,8,9,10];

let lonn =  [[485400,485400,495600,505800,556600,569100],
            [526400,526400,536700,556900,581100,598900],
            [562000,562000,567400,580500,609200,654700],
            [592100,592100,59900,609500,643700,709600],
            [611600,611600,617500,630800,66500,741000]];

function createDropStilling() {
    let velgStillingDiv = document.getElementById("velgStilling");
    let valgAnsenitetDiv = document.getElementById("velgAnsenitet");
    resultat.innerHTML = "";

    // Opprett et nytt <select> element for stillinger
    let dropdownMenuStilling = document.createElement("select");
    dropdownMenuStilling.id = "stillingDropdown";

    // Itererer gjennom stilling-arrayet
    for (let i = 0; i < stilling.length; i++) {
        // Opprett et nytt <option> element for stillingene
        let option = document.createElement("option");
        // Sett verdien og teksten til hvert alternativ til verdien i stilling-arrayet
        option.value = stilling[i];
        option.text = stilling[i];
        //option.id = i;
        // Legg til hvert <option> element til <select> elementet for stillinger
        dropdownMenuStilling.appendChild(option);
    }

    // Legg til en hendelseslytter for endring av stilling
    dropdownMenuStilling.addEventListener("change", function() {
        let selectedStillingIndex = dropdownMenuStilling.selectedIndex;
        resultat.innerHTML = "";

        // Hvis valgt stilling er en lederstilling
        if (lederstillinger.includes(selectedStillingIndex)) {
            resultat.innerHTML = lederlonn[selectedStillingIndex];
            valgAnsenitetDiv.innerHTML = "";
        } else {
            tilbruker.innerHTML = "";
            // Fjern eventuelle tidligere opprettede nedtrekksmenyer for ansenitet.
            let existingAnsenitetDropdown = document.getElementById("ansenitetDropdown");
            if (existingAnsenitetDropdown) {
                existingAnsenitetDropdown.remove();
            }

            // Opprett en ny nedtrekksmeny for ansenitet bare hvis valgt stilling ikke er en lederstilling
            let dropdownMenuAnsenitet = document.createElement("select");
            dropdownMenuAnsenitet.id = "ansenitetDropdown";

            // Itererer gjennom ansenitet-arrayet og legger til alternativer til dropdown-menyen
            for (let j = 0; j < ansenitet.length; j++) {
                let option = document.createElement("option");
                option.value = ansenitet[j];
                option.text = ansenitet[j];
                dropdownMenuAnsenitet.appendChild(option);
            }

            // Legg til den nye nedtrekksmenyen for ansenitet i valgAnsenitetDiv
            valgAnsenitetDiv.appendChild(dropdownMenuAnsenitet);

            // Legg til en hendelseslytter for endring av ansiennitet
            dropdownMenuAnsenitet.addEventListener("change", function() {
                // Hent indeksene for valgt stilling og ansiennitet
                let selectedStillingIndex = dropdownMenuStilling.selectedIndex;
                let selectedAnsenitetIndex = dropdownMenuAnsenitet.selectedIndex;

                // Hvis både stilling og ansiennitet er valgt (ikke "Velg fra listen")
                if (selectedStillingIndex !== 0 && selectedAnsenitetIndex !== 0) {
                    // Hent lønnen basert på valgt stilling og ansiennitet
                    let lonnForStillingOgAnsiennitet = lonn[selectedStillingIndex - 1][selectedAnsenitetIndex - 1];
                    console.log("Lønn:", lonnForStillingOgAnsiennitet);
                    resultat.innerHTML = "Minstelønn: " + lonnForStillingOgAnsiennitet + " .-";
                }
            });
        }
    });

    // Legg til den nye nedtrekksmenyen for stillinger i velgStillingDiv
    velgStillingDiv.appendChild(dropdownMenuStilling);
}

// Kall funksjonen createDropStilling for å opprette nedtrekksmenyen for stillinger
createDropStilling();
