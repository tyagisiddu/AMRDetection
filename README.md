# Antibiotic Resistance Prediction System

## Overview
This project implements a machine learning model to predict antibiotic resistance based on bacterial genetic markers and treatment data. The system features a dynamic web interface that collects relevant biological data and provides instant predictions using a deployed model.

## Features
- **Dynamic Form Interface**
  - Two-stage form submission process
  - Cascading dropdowns for data selection
  - Real-time form extension based on user input
  - Interactive prediction system

- **Input Parameters**
  1. Initial Selection:
     - Bacteria Type Detection
     - Antibiotic Administration Choice
  2. Extended Parameters:
     - POINT Mutations
     - COMPLETE Genes
     - PARTIAL Genes
     - PARTIAL_END_OF_CONTIG Genes

## Technology Stack
- **Frontend**
  - HTML5
  - CSS3
  - JavaScript (Vanilla)
  - Responsive Design

- **Backend/Model**
  - Python
  - Jupyter Notebook (.ipynb)
  - Machine Learning Model
  - Heroku Deployment

## Project Structure
```
project-root/
│
├── co_attn.ipynb          # Jupyter notebook containing the model code
│
├── download(1).jpeg       # Project image/asset
│
├── form-script.js         # Form handling and dynamic behavior
├── form-styles.css        # Specific styles for the form
├── forms.html            # Form template
│
├── index.html            # Main entry point of the application
│
├── main.js               # Main JavaScript functionality
├── model-fetch.js        # Model interaction and API calls
│
└── styles.css            # Global styles for the application
```

## Installation & Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/antibiotic-resistance-predictor.git
cd antibiotic-resistance-predictor
```

2. Open `index.html` in your browser to access the web interface.

## Usage Instructions

1. **Initial Form Selection**
   - Choose the detected bacteria from the first dropdown
   - Select the administered antibiotic from the second dropdown

2. **Extended Form**
   - After initial selection, four additional dropdowns will appear
   - Select values for:
     - POINT mutations
     - COMPLETE genes
     - PARTIAL genes
     - PARTIAL_END_OF_CONTIG genes

3. **Getting Predictions**
   - Click the prediction button
   - Wait for the model to process your inputs
   - View the prediction results

## Model Information
The machine learning model is developed using Python and Jupyter Notebook. The model takes genetic markers and antibiotic data as inputs to predict resistance patterns. The trained model is deployed on Heroku for real-time predictions.

### Model Features
- Input processing for genetic markers
- Resistance pattern prediction
- Deployment on Heroku platform
- RESTful API endpoint for predictions

## API Documentation

### Prediction Endpoint
```
POST https://amr-model-predictor.herokuapp.com/predict
```

### Request Format
```json
{
  "bacteria": "selected_bacteria",
  "antibiotic": "selected_antibiotic",
  "point_mutations": "selected_mutations",
  "complete_genes": "selected_complete",
  "partial_genes": "selected_partial",
  "partial_end_genes": "selected_partial_end"
}
```

### Response Format
```json
{
  "prediction": "resistance_prediction"
}
```

## Development

### Local Development
1. Make changes to the frontend files
2. Test the interface locally by opening `index.html`
3. Modify the model in `co_attn.ipynb`
4. Update the Heroku deployment as needed

### Deploying Updates
1. Commit your changes
2. Push to Heroku:
```bash
git push heroku main
```

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details.
