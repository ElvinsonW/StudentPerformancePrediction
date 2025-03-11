from flask import Flask, render_template, request, jsonify
import pickle
import numpy as np
import pandas as pd
import logging

app = Flask(__name__)

with open('model.pkl', 'rb') as f:
    model = pickle.load(f)
    
with open('scaler.pkl', 'rb') as f:
    scaler = pickle.load(f)

@app.route('/')
def home():
    return render_template("Pagepembuka.html")

@app.route('/form')
def form():
    return render_template("form.html")

@app.route('/about-us')
def about_us():
    return render_template("aboutus.html")

@app.route('/predict', methods=['POST'])
def predict():
    try:
        
        # Get All input
        hours_studied = int(request.form["hours_studied"])
        attendance = int(request.form["attendance"])
        previous_score = int(request.form["previous_score"])
        tutoring_sessions = int(request.form["tutoring_sessions"])
        motivational_level = int(request.form["motivational_level"])
        access_to_resource = int(request.form["access_to_resource"])
        teacher_quality = int(request.form["teacher_quality"])
        parental_involvement = int(request.form["parental_involvement"])
        parental_education_level = int(request.form["parental_education_level"])
        peer_influence = int(request.form["peer_influence"])
        family_income = int(request.form["family_income"])
        distance_from_home = int(request.form["distance_from_home"])
        learning_disabilities = int(request.form["learning_disabilities"])
        extracurricular_activities = int(request.form["extracurricular_activities"])
        internet_access = int(request.form["internet_access"])
        
        # Feature Extraction
        study_motivation = hours_studied * motivational_level
        resource_impact = access_to_resource + teacher_quality
        parental_support = parental_involvement * parental_education_level
        strong_support_system = int((parental_involvement > 1) & (teacher_quality == 2) & (access_to_resource > 1))
        
        data = [
            attendance,
            hours_studied,
            study_motivation,
            resource_impact,
            previous_score,
            parental_involvement,
            tutoring_sessions,
            parental_support,
            peer_influence,
            family_income,
            distance_from_home,
            strong_support_system,
            learning_disabilities,
            extracurricular_activities,
            internet_access
        ]
        
        features = np.array([data]).reshape(1, -1)

        # Convert features to DataFrame with matching column names
        feature_names = ["Attendance", "Hours_Studied", "Study_Motivation", "Resource_Impact",
                        "Previous_Scores", "Parental_Involvement", "Tutoring_Sessions",
                        "Parental_Support", "Peer_Influence", "Family_Income",
                        "Distance_from_Home", "Strong_Support_System",
                        "Learning_Disabilities", "Extracurricular_Activities", "Internet_Access"]


        features_df = pd.DataFrame(features, columns=feature_names)

        scalable_features = ['Attendance', 'Hours_Studied', 'Study_Motivation', 'Previous_Scores', 'Tutoring_Sessions']
        try:
            features_df[scalable_features] = scaler.transform(features_df[scalable_features])
        except Exception as e:
            print(f"{e}")


        prediction = np.clip(model.predict(features_df), 0, 100)
        
        return jsonify({'prediction': prediction.tolist()})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
