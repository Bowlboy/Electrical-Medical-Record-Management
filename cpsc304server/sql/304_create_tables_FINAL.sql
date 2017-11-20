drop table Employs;

drop table Receptionist;

drop table Appointment;

drop table CaresFor;


drop table Prescribes;

drop table Allergy;

drop table Vaccination;

drop table Clinic;
drop sequence seq_clinic;

drop table LabOrder;

drop table Test;
drop sequence seq_test;

drop table Laboratory;
drop sequence seq_laboratory;

drop table Prescription;
drop sequence seq_prescription;

drop table Drug;
drop sequence seq_drug;

drop table Physician;

drop table Employee;
drop sequence seq_employee;

drop table MedicalRecord;
drop sequence seq_medicalRecord;

drop table Patient;
drop sequence seq_patient;


CREATE TABLE Patient (
        patient_id INT NOT NULL,
        firstName VARCHAR(45) NOT NULL,
        lastName VARCHAR(45) NOT NULL,
        phone VARCHAR(15) NOT NULL,
        address VARCHAR(45) NOT NULL,
        gender VARCHAR(15) NOT NULL,
        email VARCHAR(45) NULL,
        birthDate VARCHAR(15) NOT NULL,
        PRIMARY KEY (patient_id));

grant all privileges on Patient to public;

create sequence seq_patient start with 20000 increment by 10 cache 10 nocycle;


CREATE TABLE Employee (
        employee_id INT NOT NULL,
        email VARCHAR(45) NOT NULL,
        phone VARCHAR(15) NULL,
        firstName VARCHAR(45) NOT NULL,
        lastName VARCHAR(45) NOT NULL,
        PRIMARY KEY (employee_id));

        grant all privileges on Employee to public;
create sequence seq_employee start with 2000 increment by 10 cache 10 nocycle;


CREATE TABLE Receptionist (
        employee_id INT NOT NULL,
        PRIMARY KEY (employee_id),
        FOREIGN KEY (employee_id)
        REFERENCES  Employee (employee_id)
        ON DELETE CASCADE
        );

        grant all privileges on Receptionist to public;


CREATE TABLE Physician (
        employee_id INT NOT NULL,
        license_number INT NOT NULL,
        specialization VARCHAR(45) NULL,
        PRIMARY KEY (employee_id),
        FOREIGN KEY (employee_id)
        REFERENCES Employee (employee_id)
        ON DELETE CASCADE
        );

        grant all privileges on Physician to public;



CREATE TABLE Clinic (
        clinic_id INT NOT NULL,
        address VARCHAR(45) NOT NULL,
        phone VARCHAR(15) NOT NULL,
        PRIMARY KEY (clinic_id));

grant all privileges on Clinic to public;
  create sequence seq_clinic start with 200 increment by 10 cache 10 nocycle;


CREATE TABLE Employs (
        employee_id INT NOT NULL,
        clinic_id INT NOT NULL,
        start_date VARCHAR(15) NULL,
        hours INT NULL,
        PRIMARY KEY (employee_id, clinic_id),
        FOREIGN KEY (clinic_id)
        REFERENCES Clinic (clinic_id)
        ON DELETE CASCADE,
        FOREIGN KEY (employee_id)
        REFERENCES Employee (employee_id)
        ON DELETE CASCADE
        );

grant all privileges on Employs to public;


CREATE TABLE Appointment (
        clinic_id INT NOT NULL,
        license_number INT NOT NULL,
        startTime VARCHAR(45) NOT NULL,
        appointmentDate VARCHAR(15) NOT NULL,
        patient_id INT NULL,
        PRIMARY KEY (clinic_id, license_number, startTime, appointmentDate),
        FOREIGN KEY (clinic_id)
        REFERENCES Clinic (clinic_id)
        ON DELETE CASCADE,
        FOREIGN KEY (patient_id)
        REFERENCES Patient (patient_id)
        ON DELETE CASCADE
         );

grant all privileges on Appointment to public;

CREATE TABLE CaresFor (
        employee_id INT NOT NULL,
        patient_id INT NOT NULL,
        PRIMARY KEY (employee_id, patient_id),
        FOREIGN KEY (employee_id)
        REFERENCES Physician (employee_id)
        ON DELETE CASCADE,
        FOREIGN KEY (patient_id)
        REFERENCES Patient (patient_id)
        ON DELETE CASCADE
        );
grant all privileges on CaresFor to public;


CREATE TABLE Laboratory (
        lab_id INT NOT NULL,
		name VARCHAR(30) NOT NULL,
        address VARCHAR(50) NOT NULL,
		city VARCHAR(20) NOT NULL,
        PRIMARY KEY (lab_id));

grant all privileges on Laboratory to public;

  create sequence seq_laboratory start with 60 increment by 10 cache 10 nocycle;

  CREATE TABLE Test (
        test_id INT NOT NULL,
        lab_id INT NULL,
        description VARCHAR(30),
        PRIMARY KEY (test_id),
        FOREIGN KEY (lab_id)
        REFERENCES Laboratory (lab_id)
        ON DELETE CASCADE
        );

grant all privileges on Test to public;

  create sequence seq_test start with 300 increment by 10 cache 10 nocycle;



CREATE TABLE LabOrder (
        test_id INT NULL,
        employee_id INT NOT NULL,
        patient_id INT NOT NULL,
        labOrderDate VARCHAR(15) NOT NULL,
		status VARCHAR(15),
		result VARCHAR(20),
		time VARCHAR(15),
        PRIMARY KEY (employee_id, patient_id, labOrderDate),
        FOREIGN KEY (test_id)
        REFERENCES Test (test_id)
        ON DELETE SET NULL
        );

grant all privileges on LabOrder to public;


CREATE TABLE Prescription (
        prescription_id INT NOT NULL,
        patient_id INT NULL,
        employee_id INT NULL,
        prescriptionDate VARCHAR(15) NOT NULL,
        PRIMARY KEY (prescription_id),
        FOREIGN KEY (patient_id)
        REFERENCES Patient (patient_id)
        ON DELETE CASCADE,
        FOREIGN KEY (employee_id)
        REFERENCES Physician (employee_id)
        ON DELETE SET NULL
        );
grant all privileges on Prescription to public;

  create sequence seq_prescription start with 200000 increment by 10 cache 10 nocycle;


CREATE TABLE Drug (
        drug_id INT NOT NULL,
        description VARCHAR(90) NOT NULL,
        name VARCHAR(45) NOT NULL,
        class VARCHAR(45) NOT NULL,
        PRIMARY KEY (drug_id));

grant all privileges on Drug to public;

  create sequence seq_drug start with 20000000 increment by 10 cache 10 nocycle;



CREATE TABLE Prescribes (
        drug_id INT NOT NULL,
        prescription_id INT NOT NULL,
        quantity VARCHAR(45) NOT NULL,
        PRIMARY KEY (drug_id, prescription_id),
        FOREIGN KEY (drug_id)
        REFERENCES Drug (drug_id)
        ON DELETE CASCADE,
        FOREIGN KEY (prescription_id)
        REFERENCES Prescription (prescription_id)
        ON DELETE CASCADE
        );

grant all privileges on Prescribes to public;



CREATE TABLE MedicalRecord (
        medicalRecord_id INT NOT NULL,
        patient_id INT NOT NULL,
        height INT NULL,
        weight INT NULL,
        specialNotes VARCHAR(90) NULL,
        PRIMARY KEY (medicalRecord_id),
        FOREIGN KEY (patient_id)
        REFERENCES Patient (patient_id)
        ON DELETE CASCADE
        );

grant all privileges on MedicalRecord to public;

  create sequence seq_medicalRecord start with 2000000 increment by 100 cache 10 nocycle;


  CREATE TABLE Allergy (
  		medicalRecord_id INT NOT NULL,
  		allergen VARCHAR(20) NOT NULL,
  		PRIMARY KEY (medicalRecord_id, allergen),
  		FOREIGN KEY (medicalRecord_id)
  		REFERENCES MedicalRecord(medicalRecord_id)
  		ON DELETE CASCADE);

  grant all privileges on Allergy to public;

  CREATE TABLE Vaccination(
  		medicalRecord_id INT NOT NULL,
  		vaccine VARCHAR(15) NOT NULL,
  		PRIMARY KEY (medicalRecord_id, vaccine),
  		FOREIGN KEY (medicalRecord_id)
  		REFERENCES MedicalRecord(medicalRecord_id)
  		ON DELETE CASCADE);

  grant all privileges on Vaccination to public;
