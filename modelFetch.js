const predictionForm = document.getElementById('prediction-form');
const resultDiv = document.getElementById('result');

predictionForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    resultDiv.innerHTML = 'Loading...';
    
    const formData = new FormData(predictionForm);
    
    try {
        const response = await fetch('https://amr-model-predictor.herokuapp.com/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Object.fromEntries(formData)),
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const prediction = await response.json();
        
        resultDiv.innerHTML = `
            <h3>Prediction Result:</h3>
            <p>${JSON.stringify(prediction, null, 2)}</p>
        `;
        
    } catch (error) {
        console.error('Error:', error);
        resultDiv.innerHTML = `
            <p class="error">Error: ${error.message}</p>
        `;
    }
});

const resetButton = document.getElementById('reset-button');
if (resetButton) {
    resetButton.addEventListener('click', () => {
        predictionForm.reset();
        resultDiv.innerHTML = '';
    });
}