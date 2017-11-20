CREATE VIEW ImmunizedPatients AS
SELECT P.patient_id, P.firstname, P.lastname
FROM Patient P, MedicalRecord MR, Vaccination V
WHERE MR.patient_id = P.patient_id AND 
MR.medicalRecord_id = V.medicalRecord_id AND 
V.vaccine LIKE '%Flu%';