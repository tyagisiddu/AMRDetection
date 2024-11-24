document.getElementById('showPartials').addEventListener('click', function(e) {
    const bacteria = document.getElementById('bacteria').value;
    const antibiotic = document.getElementById('antibiotic').value;
    
    if (!bacteria || !antibiotic) {
        alert("Please select values for Bacteria and Antibiotic before proceeding!");
        return;
    }
    
    document.getElementById('partialFields').classList.toggle('show');
});

const selectedValues = {
    A: [],
    B: [],
    C: [],
    D: []
};

document.querySelectorAll('.multiselect-input').forEach(input => {
    input.addEventListener('click', function(e) {
        document.querySelectorAll('.multiselect-dropdown').forEach(dropdown => {
            if (dropdown !== this.nextElementSibling) {
                dropdown.classList.remove('show');
            }
        });
        
        this.nextElementSibling.classList.toggle('show');
        e.stopPropagation();
    });
});

document.querySelectorAll('.multiselect-option').forEach(option => {
    option.addEventListener('click', function(e) {
        const field = this.closest('.multiselect').querySelector('.multiselect-input').dataset.field;
        const value = this.dataset.value;
        
        this.classList.toggle('selected');
        
        if (this.classList.contains('selected')) {
            selectedValues[field].push(value);
        } else {
            const index = selectedValues[field].indexOf(value);
            if (index > -1) {
                selectedValues[field].splice(index, 1);
            }
        }
        
        const input = this.closest('.multiselect').querySelector('.multiselect-input');
        if (selectedValues[field].length > 0) {
            input.innerHTML = `<div class="selected-items">` +
                selectedValues[field].map(val => `<span class="selected-item">${val}</span>`).join('') +
                '</div>';
        } else {
            input.textContent = 'Click to select values';
        }
        
        e.stopPropagation();
    });
});

document.addEventListener('click', function() {
    document.querySelectorAll('.multiselect-dropdown').forEach(dropdown => {
        dropdown.classList.remove('show');
    });
});

function validateForm() {
    const bacteria = document.getElementById('bacteria').value;
    const antibiotic = document.getElementById('antibiotic').value;
    
    if (!bacteria || !antibiotic) {
        alert("Please select both Bacteria and Antibiotic!");
        return false;
    }

    const partialFields = document.getElementById('partialFields');
    if (partialFields.classList.contains('show')) {
        const emptyFields = [];
        
        if (selectedValues.A.length === 0) emptyFields.push('POINT Mutations');
        if (selectedValues.B.length === 0) emptyFields.push('COMPLETE Genes');
        if (selectedValues.C.length === 0) emptyFields.push('PARTIAL Genes');
        if (selectedValues.D.length === 0) emptyFields.push('PARTIAL_END_OF_CONTIG Genes');
        
        if (emptyFields.length > 0) {
            alert(`Please select values for: ${emptyFields.join(', ')}`);
            return false;
        }
    }
    
    return true;
}

document.getElementById('amrForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        return;
    }
    
    const formData = {
        bacteria: document.getElementById('bacteria').value,
        antibiotic: document.getElementById('antibiotic').value,
        fieldA: selectedValues.A,
        fieldB: selectedValues.B,
        fieldC: selectedValues.C,
        fieldD: selectedValues.D
    };
    console.log(formData);
});


const resistanceDatabase = {};

function generateKey(formData) {
    console.log('Generating key with:', {
        bacteria: formData.bacteria,
        antibiotic: formData.antibiotic,
        fieldA: formData.fieldA,
        fieldB: formData.fieldB,
        fieldC: formData.fieldC,
        fieldD: formData.fieldD
    });

    const key = JSON.stringify({
        bacteria: formData.bacteria,
        antibiotic: formData.antibiotic,
        fieldA: [...formData.fieldA].sort(),
        fieldB: [...formData.fieldB].sort(),
        fieldC: [...formData.fieldC].sort(),
        fieldD: [...formData.fieldD].sort()
    });

    console.log('Generated key:', key);
    return key;
}

function generateRandomPrediction() {
    const prediction = Math.random() >= 0.5 ? 'YES' : 'NO';
    console.log('Generated random prediction:', prediction);
    return prediction;
}

document.getElementById('predictButton').addEventListener('click', function(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        return;
    }
    
    console.log('Current selectedValues:', JSON.parse(JSON.stringify(selectedValues)));
    
    const formData = {
        bacteria: document.getElementById('bacteria').value,
        antibiotic: document.getElementById('antibiotic').value,
        fieldA: Array.from(selectedValues.A),
        fieldB: Array.from(selectedValues.B),
        fieldC: Array.from(selectedValues.C),
        fieldD: Array.from(selectedValues.D)
    };

    console.log('Captured form data:', JSON.parse(JSON.stringify(formData)));

    const dataKey = generateKey(formData);
    
    let prediction;
    
    if (resistanceDatabase.hasOwnProperty(dataKey)) {
        prediction = resistanceDatabase[dataKey];
        console.log('Found existing prediction:', prediction);
    } else {
        prediction = generateRandomPrediction();
        resistanceDatabase[dataKey] = prediction;
        console.log('Stored new prediction:', {
            key: dataKey,
            prediction: prediction
        });
    }


    document.getElementById('spinnerOverlay').style.display = 'flex';

    // Wait 3 seconds before showing the alert and removing the spinner
    setTimeout(function() {
        document.getElementById('spinnerOverlay').style.display = 'none';

        alert(prediction === 'YES' ? 
              'YES Antimicrobial Resistance Detected' : 
              'NO Antimicrobial Resistance Detected');
    }, 3000);
    // setTimeout(function() {
    //     alert(prediction === 'YES' ? 
    //           'YES Antimicrobial Resistance Detected' : 
    //           'NO Antimicrobial Resistance Detected');
    // }, 3000);

    console.log('Current Database State:', JSON.parse(JSON.stringify(resistanceDatabase)));
});
