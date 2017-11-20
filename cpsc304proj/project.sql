drop table Employs;

drop table Receptionist;

drop table Appointment;

drop table CaresFor;

drop table LabOrder;

drop table Prescribes;

drop table Allergy;

drop table Vaccination;

drop table Clinic;

drop table Test;

drop table Laboratory;

drop table Prescription;

drop table Drug;

drop table Physician;

drop table Employee;

drop table MedicalRecord;

drop table Patient;


CREATE TABLE Patient (
        patient_id INT NOT NULL,
        firstName VARCHAR(45) NOT NULL,
        lastName VARCHAR(45) NOT NULL,
        phone VARCHAR(11) NOT NULL,
        address VARCHAR(45) NOT NULL,
        gender VARCHAR(10) NOT NULL,
        email VARCHAR(45) NULL,
        birthDate VARCHAR(10) NOT NULL,
        PRIMARY KEY (patient_id));

grant all privileges on Patient to public;

create sequence seq_patient start with 10000 increment by 1 cache 10 nocycle;


CREATE TABLE Employee (
        employee_id INT NOT NULL,
        email VARCHAR(45) NOT NULL,
        phone VARCHAR(11) NULL,
        firstName VARCHAR(45) NOT NULL,
        lastName VARCHAR(45) NOT NULL,
        PRIMARY KEY (employee_id));

        grant all privileges on Employee to public;
          create sequence seq_employee start with 10000 increment by 1 cache 10 nocycle;


CREATE TABLE Receptionist (
        employee_id INT NOT NULL,
        PRIMARY KEY (employee_id),
        FOREIGN KEY (employee_id)
        REFERENCES  Employee (employee_id)
        ON DELETE CASCADE
        );

        grant all privileges on Receptionist to public;
          create sequence seq_receptionist start with 10000 increment by 1 cache 10 nocycle;



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

          create sequence seq_physician start with 10000 increment by 1 cache 10 nocycle;



CREATE TABLE Clinic (
        clinic_id INT NOT NULL,
        address VARCHAR(45) NOT NULL,
        phone VARCHAR(11) NOT NULL,
        PRIMARY KEY (clinic_id));

grant all privileges on Clinic to public;
  create sequence seq_clinic start with 10000 increment by 1 cache 10 nocycle;


CREATE TABLE Employs (
        employee_id INT NOT NULL,
        clinic_id INT NOT NULL,
        start_date VARCHAR(10) NULL,
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

  create sequence seq_employs start with 10000 increment by 1 cache 10 nocycle;


CREATE TABLE Appointment (
        clinic_id INT NOT NULL,
        license_number INT NOT NULL,
        startTime VARCHAR(45) NOT NULL,
        appointmentDate VARCHAR(10) NOT NULL,
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

  create sequence seq_appointment start with 10000 increment by 1 cache 10 nocycle;

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

  create sequence seq_caresFor start with 10000 increment by 1 cache 10 nocycle;



CREATE TABLE Laboratory (
        lab_id INT NOT NULL,
        city VARCHAR(20) NOT NULL,
        PRIMARY KEY (lab_id));

grant all privileges on Laboratory to public;

  create sequence seq_laboratory start with 10000 increment by 1 cache 10 nocycle;

        CREATE TABLE Test (
        test_id INT NOT NULL,
        lab_id INT NULL,
        status VARCHAR(45) NOT NULL,
        result VARCHAR(90) NOT NULL,
        time VARCHAR(6) NULL,
        PRIMARY KEY (test_id),
        FOREIGN KEY (lab_id)
        REFERENCES Laboratory (lab_id)
        ON DELETE CASCADE
        );

grant all privileges on Test to public;

  create sequence seq_test start with 10000 increment by 1 cache 10 nocycle;



CREATE TABLE LabOrder (
        lab_id INT NULL,
        test_id INT NULL,
        employee_id INT NOT NULL,
        patient_id INT NOT NULL,
        labOrderDate VARCHAR(10) NOT NULL,
        PRIMARY KEY (employee_id, patient_id, labOrderDate),
        FOREIGN KEY (lab_id)
        REFERENCES Laboratory (lab_id)
        ON DELETE SET NULL
        ,
        FOREIGN KEY (test_id)
        REFERENCES Test (test_id)
        ON DELETE SET NULL
        );

grant all privileges on LabOrder to public;

  create sequence seq_labOrder start with 10000 increment by 1 cache 10 nocycle;


CREATE TABLE Prescription (
        prescription_id INT NOT NULL,
        patient_id INT NULL,
        employee_id INT NULL,
        prescriptionDate VARCHAR(10) NOT NULL,
        PRIMARY KEY (prescription_id),
        FOREIGN KEY (patient_id)
        REFERENCES Patient (patient_id)
        ON DELETE CASCADE
       	,
        FOREIGN KEY (employee_id)
        REFERENCES Physician (employee_id)
        ON DELETE SET NULL
        );
grant all privileges on Prescription to public;

  create sequence seq_prescription start with 10000 increment by 1 cache 10 nocycle;


CREATE TABLE Drug (
        drug_id INT NOT NULL,
        description VARCHAR(90) NOT NULL,
        name VARCHAR(45) NOT NULL,
        class VARCHAR(45) NOT NULL,
        price VARCHAR(10) NOT NULL,
        PRIMARY KEY (drug_id));

grant all privileges on Drug to public;

  create sequence seq_drug start with 10000 increment by 1 cache 10 nocycle;



CREATE TABLE Prescribes (
        drug_id INT NOT NULL,
        prescription_id INT NOT NULL,
        quantity VARCHAR(45) NOT NULL,
        PRIMARY KEY (drug_id, prescription_id),
        FOREIGN KEY (drug_id)
        REFERENCES Drug (drug_id)
        ON DELETE CASCADE
        ,
        FOREIGN KEY (prescription_id)
        REFERENCES Prescription (prescription_id)
        ON DELETE CASCADE
        );

grant all privileges on Prescribes to public;

  create sequence seq_prescribes start with 10000 increment by 1 cache 10 nocycle;



CREATE TABLE MedicalRecord (
        medicalRecord_id INT NOT NULL,
        patient_id INT NOT NULL,
        height INT NULL,
        weight INT NULL,
        specialNotes VARCHAR(90) NULL,
        medications VARCHAR(90) NOT NULL,
        immunizations VARCHAR(90) NOT NULL,
        allergies VARCHAR(90) NOT NULL,
        treatments VARCHAR(90) NULL,
        PRIMARY KEY (medicalRecord_id),
        FOREIGN KEY (patient_id)
        REFERENCES Patient (patient_id)
        ON DELETE CASCADE
        );

grant all privileges on MedicalRecord to public;

  create sequence seq_medicalRecord start with 10000 increment by 1 cache 10 nocycle;


  CREATE TABLE Allergy (
  		medicalRecord_id INT NOT NULL,
  		allergen VARCHAR(20) NOT NULL,
  		PRIMARY KEY (medicalRecord_id, allergen),
  		FOREIGN KEY (medicalRecord_id)
  		REFERENCES MedicalRecord(medicalRecord_id)
  		ON DELETE CASCADE);

  grant all privileges on Allergy to public;

    create sequence seq_allergy start with 10000 increment by 1 cache 10 nocycle;


  CREATE TABLE Vaccination(
  		medicalRecord_id INT NOT NULL,
  		vaccine VARCHAR(10) NOT NULL,
  		PRIMARY KEY (medicalRecord_id, vaccine),
  		FOREIGN KEY (medicalRecord_id)
  		REFERENCES MedicalRecord(medicalRecord_id)
  		ON DELETE CASCADE);

  grant all privileges on Vaccination to public;

    create sequence seq_vaccination start with 10000 increment by 1 cache 10 nocycle;
