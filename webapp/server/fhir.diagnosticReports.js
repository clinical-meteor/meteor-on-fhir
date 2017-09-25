


Meteor.methods({
  createDiagnosticReport:function(diagnosticReportObject){
    check(diagnosticReportObject, Object);

    if (process.env.NODE_ENV === 'test') {
      console.log('Creating DiagnosticReport...');
      DiagnosticReports.insert(diagnosticReportObject, function(error, result){
        if (error) {
          console.log(error);
        }
        if (result) {
          console.log('DiagnosticReport created: ' + result);
        }
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  },
  initializeDiagnosticReports:function(){

    if (DiagnosticReports.find().count() === 0) {
      console.log('No records found in DiagnosticReports collection.  Lets create some...');

      var siim_joe_tcga_17_z058 = {
        "resourceType": "DiagnosticReport",
        "text": {
          "status": "generated",
          "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p>Clinical indication: Followup lung mass.</p><p>Comparison: Chest CTA from 5/5/1986</p><p>Technique: Multidetector axial CT of the chest was performed without the administration of intravenous contrast.</p><p>Findings:</p><p>Interval placement of a tracheostomy tube. </p><p>The thyroid and thoracic inlet are normal. There are no grossly enlarged axillary or mediastinal lymph nodes, however the hila are difficult to assess without the use of contrast. There is relative hyperdensity of the intraventricular septum suggestive of anemia. The heart is normal in size without significant pericardial effusion. A small hiatal hernia is present.</p><p>Stable emphysema. Post-surgical changes from left lower lobectomy again seen with persistent moderate to large subpulmonic loculated hydropneumothorax. Interval decrease in septal thickening with mild persistent septal prominence within the right lung.</p><p>Upper abdomen unremarkable given lack of IV contrast.</p><p>Stable surgical defect in the posterior left 6th rib. No suspicious osseous lesions.</p><p>Impression: 1. Stable findings of left lower lobectomy with persistent subpulmonic hydropneumothorax.</p><p>2. Interval decrease in pulmonary edema with mild residual right sided septal prominence.</p></div>"
        },
        "code": {
          "coding": [
            {
              "system": "http://loinc.org/",
              "code": "24627-2"
            }
          ],
          "text": "Chest CT"
        },
        "status": "final",
        "issued": "1986-05-31T14:30:00+10:00",
        "subject": {
          "reference": "Patient/siimjoe"
        },
        "performer": [{
          "reference": "Organization/siim",
          "display": "Society of Imaging Informatics in Medicine"
        }],
        "identifier": [
          {
            "use": "usual",
            "system": "http://www.siim.org/",
            "value": "1654061970756517"
          }
        ],
        "category": {
          "coding": [
            {
              "system": "http://hl7.org/fhir/v2/0074",
              "code": "RAD"
            }
          ]
        },
        "effectiveDateTime": "1986-05-31",
        "conclusion": "Impression: 1. Stable findings of left lower lobectomy with persistent subpulmonic hydropneumothorax. 2. Interval decrease in pulmonary edema with mild residual right sided septal prominence.",
        "": [
          {
            "coding": [
              {
                "system": "http://snomed.info/sct",
                "code": "35917007",
                "display": "Adenocarcinoma"
              }
            ]
          }
        ]
      };

      Meteor.call('createDiagnosticReport', siim_joe_tcga_17_z058);


      var siim_neela_tcga_ba_4077 = {
        "resourceType": "DiagnosticReport",
        "text": {
          "status": "generated",
          "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p>CT Head and Neck with contrast 4/28/1986</p>\n\n<p>Clinical information:\n65 yo Female with recurrent right base of tongue cancer after chemotherapy and radiotherapy</p>\n\n<p>Comparison:\nNone.</p>\n\n<p>Technique:\nSequential axial CT images were obtained from the base of the brain to the thoracic inlet following the uneventful administration of intravenous contrast.</p>\n\n<p>Findings:\nOrbits, paranasal sinuses, and skull base: Normal skull base and orbits. Mucosal thickening in both maxillary sinuses.</p>\n\n<p>Nasopharynx: Normal.</p>\n\n<p>Suprahyoid neck: There is a nectrotic heterogenously enhancing mass in the base of the right tongue that measures 3.0 cm x 3.7 cm (Ap versus transverse) with gas identified in the mass. No bulky local lymph nodes. No extension of the mass into the mandible, retropharyngeal or parapharyngeal space. Mild mass effect into the oropharynx.</p>\n\n<p>Infrahyoid neck: Normal larynx, hypopharynx, and supraglottis.</p>\n\n<p>Thyroid: Normal.</p>\n\n<p>Thoracic inlet: Normal lung apices and brachial plexus.</p>\n\n<p>Lymph nodes Normal. No lymphadenopathy.</p>\n\n<p>Vascular structures: Normal.</p>\n\n<p>Other findings: None.</p>\n\n<p>Impression\n1. 3.0 cm x 3.7 cm mass in the base of the right tongue as detailed above consistent with known malignancy</p>\n</div>"
        },
        "code": {
          "coding": [
            {
              "system": "http://loinc.org/",
              "code": "36235-0"
            }
          ],
          "text": "CT NECK SOFT TISSUE  W/ CONTR"
        },
        "status": "final",
        "issued": "1996-04-28T09:23:00+10:00",
        "subject": {
          "reference": "Patient/siimneela"
        },
        "performer": [{
          "reference": "Organization/siim",
          "display": "Society of Imaging Informatics in Medicine"
        }],
        "identifier": [
          {
            "use": "usual",
            "system": "http://www.siim.org/",
            "value": "2605867053656544"
          }
        ],
        "category": {
          "coding": [
            {
              "system": "http://hl7.org/fhir/v2/0074",
              "code": "RAD"
            }
          ]
        },
        "effectiveDateTime": "1996-04-28",
        "conclusion": "Impression: 1. 3.0 cm x 3.7 cm mass in the base of the right tongue as detailed above consistent with known malignancy."
      }
      Meteor.call('createDiagnosticReport', siim_neela_tcga_ba_4077);
      

      var siim_ravi_lidc_idri_0132 = {
        "resourceType": "DiagnosticReport",
        "text": {
          "status": "generated",
          "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p>CT Chest with Contrast 1/1/00 at 10:04 AM</p>\n\n<p>Clinical History: Abnormal chest x-ray</p>\n\n<p>Comparison: Chest XR 1/1/00</p>\n\n<p>Technique: Contiguous axial CT images of the chest were obtained after the administration of IV contrast material.</p>\n\n<p>Findings:</p>\n\n<p>The heart is normal in size. There is no pericardial effusion.</p>\n\n<p>The thoracic aorta is normal in size and caliber. There is a bovine configuration of the aortic arch, a normal variant. Mild atherosclerotic changes are present in the upper abdominal aorta.</p>\n\n<p>There is a 2.2 x 1.4 cm cavitary lesion in the left upper lobe (Image 30/116). Linear bandlike areas of scarring/atelectasis are present in the right upper lobe with associated bronchiectasis. Bronchiectasis is also seen in the left upper lobe. The central airways are clear. Pleural-parenchymal scarring is present at the lung apices. There is no pleural effusion.</p>\n\n<p>There is no axillary, mediastinal, or hilar adenopathy. The thyroid gland is within normal limits.</p>\n\n<p>The visualized portions of the upper abdomen are unremarkable. No suspicious osseous lesion is seen. There is evidence of prior trauma/deformity of the right 5th rib.</p>\n\n<p>Impression:</p>\n\n<ol>\n<li><p>Cavitary lesion in the left upper lobe. Differential diagnosis infectious and neoplastic disease.</p></li>\n<li><p>Bandlike areas of atelectasis/scarring and bronchiectasis in the right upper lobe likely related to prior infection/insult.</p></li>\n</ol>\n</div>"
        },
        "code": {
          "coding": [
            {
              "system": "http://loinc.org/",
              "code": "24627-2"
            }
          ],
          "text": "CT Chest"
        },
        "status": "final",
        "issued": "2000-01-02T09:23:00+10:00",
        "subject": {
          "reference": "Patient/siimravi"
        },
        "performer": [{
          "reference": "Organization/siim",
          "display": "Society of Imaging Informatics in Medicine"
        }],
        "identifier": [
          {
            "use": "usual",
            "system": "http://www.siim.org/",
            "value": "2819497684894126"
          }
        ],
        "category": {
          "coding": [
            {
              "system": "http://hl7.org/fhir/v2/0074",
              "code": "RAD"
            }
          ]
        },
        "effectiveDateTime": "2000-01-02",
        "conclusion": "Impression: Cavitary lesion in the left upper lobe. Differential diagnosis infectious and neoplastic disease. Bandlike areas of atelectasis/scarring and bronchiectasis in the right upper lobe likely related to prior infection/insult."
      }
      Meteor.call('createDiagnosticReport', siim_ravi_lidc_idri_0132);


      var siim_sally_breastdx_01_0003 = {
        "resourceType": "DiagnosticReport",
        "text": {
          "status": "generated",
          "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\">\r\n <p>05/24/2008\nSurgical Specimen Radiograph</p>\n\n<p>Clinical History:  Unknown</p>\n\n<p>Technique: Single surgical specimen radiograph</p>\n\n<p>Findings: The surgical specimen contains an intact wire and surgical clip.  No masses or calcifications are identified.</p>\n\n<p>Impression:</p>\n\n<p>Specimen radiograph with intact wire and surgical clip.</p> </div>"
        },
        "": [
          {
            "coding": [
              {
                "system": "http://snomed.info/sct",
                "code": "89164003",
                "display": "left breast lump"
              }
            ]
          }
        ],
        "code": {
          "coding": [
            {
              "system": "http://loinc.org/",
              "code": "24597-7"
            }
          ],
          "text": "Breast Specimen Mammogram"
        },
        "status": "final",
        "issued": "2008-05-24T09:23:00+10:00",
        "subject": {
          "reference": "Patient/siimsally"
        },
        "performer": [{
          "reference": "Organization/siim",
          "display": "Society of Imaging Informatics in Medicine"
        }],
        "identifier": [
          {
            "use": "usual",
            "system": "http://www.siim.org/",
            "value": "2889127246021897"
          }
        ],
        "category": {
          "coding": [
            {
              "system": "http://hl7.org/fhir/v2/0074",
              "code": "RAD"
            }
          ]
        },
        "effectiveDateTime": "2008-05-24",
        "conclusion": "Specimen radiograph with intact wire and surgical clip."
      }
      Meteor.call('createDiagnosticReport', siim_sally_breastdx_01_0003);

      

      var siim_andy_tcga_50_5072_ct = {
        "resourceType": "DiagnosticReport",
        "text": {
          "status": "generated",
          "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p>Indication: Mass seen on chest x-ray</p>\n\n<p>Comparison: None.</p>\n\n<p>Procedure: CT scan of the chest was performed without intravenous contrast.</p>\n\n<p>Findings: No suspicious axillary or supraclavicular adenopathy.  There are several enlarged mediastinal lymph nodes including 2.7 x 2.2 cm AP window (series 3, image 22), 1.9 x 1.6 cm lower paratracheal (series 3, image 23).  There are a few small right paratracheal nodes that are not enlarged by CT size criteria.</p>\n\n<p>Evaluation of lung windows demonstrates a 4.4 x 3.4 cm left upper lobe mass with well circumscribed borders (series 3, image #12).  A smaller daughter mass measuring 1 cm is seen on (series 3, image #18).  There are no  contralateral lung nodules.  Emphysematous changes are seen greatest in the upper lobes.  No focal infiltrate or pneumothorax.  No pleural thickening or pneumothorax.</p>\n\n<p>Non-contrast evaluation of the upper abdomen is unremarkable.  The liver demonstrates homogenous attenuation.  The adrenal glands are partially imaged, but appear within normal limits.</p>\n\n<p>Evaluation of bone windows does not demonstrate suspicious lucent or sclerotic lesion.</p>\n\n<p>Impression:\n1. Left upper lobe mass, suspicious for malignancy.\n2. Mediastinal adenopathy measuring up to 2.7 cm, without contralateral lung nodules.</p></div>"
        },
        "code": {
          "coding": [
            {
              "system": "http://loinc.org/",
              "code": "24627-2"
            }
          ],
          "text": "Chest CT"
        },
        "status": "final",
        "issued": "2000-01-28T09:23:00+10:00",
        "subject": {
          "reference": "Patient/siimandy"
        },
        "performer": [{
          "reference": "Organization/siim",
          "display": "Society of Imaging Informatics in Medicine"
        }],
        "identifier": [
          {
            "use": "usual",
            "system": "http://www.siim.org/",
            "value": "2508258761846499"
          }
        ],
        "category": {
          "coding": [
            {
              "system": "http://hl7.org/fhir/v2/0074",
              "code": "RAD"
            }
          ]
        },
        "effectiveDateTime": "2000-01-28",
        "conclusion": "Impression:\n1. Left upper lobe mass, suspicious for malignancy.\n2. Mediastinal adenopathy measuring up to 2.7 cm, without contralateral lung nodules."
      }
      Meteor.call('createDiagnosticReport', siim_andy_tcga_50_5072_ct);

      var siim_andy_tcga_50_5072_petct = {
        "resourceType": "DiagnosticReport",
        "text": {
          "status": "generated",
          "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p>Exam: PET/CT Scan Whole Body</p>\n\n<p>Date: 2/11/2000</p>\n\n<p>Indication: Initial staging for lung cancer</p>\n\n<p>Procedure: Following injection of 14.6 mCi of F-18 labeled glucose, concurrent PET CT scanning was performed.  Patient also recieved 125 ml of isovue intravenously for diagnostic scanning purposes.</p>\n\n<p>Findings:\nOncologic Findings:\nAgain seen is a 4.6 x 4.6 mass in the left upper lobe (series 3, iamge 78).  The SUV max of the mass is 3.1.</p>\n\n<p>The large AP window lymph node on (series 3, image 89) is again noted and has a maximum SUV of 1.5.</p>\n\n<p>No contralateral lung nodules are identified.  There is physiologic activity in both adrenal glands.</p>\n\n<p>No FDG avid bone metastasis.</p>\n\n<p>Other Findings:\nVisualized intracranial structures are unremarkable.  The trachea is midline.  The thyroid is unremarkable.  No cervical adenopathy.  The salivary glands are unremarkable.</p>\n\n<p>Continued emphysematous changes in the upper lobes bilaterally.  No infiltrate or pleural effusion.  No pneumothorax.</p>\n\n<p>The liver enhances homogenously.  The spleen and pancreas are within normal limits.  The kidneys are unremarkable.  Visualized bowel is unremarkable.  No free fluid or free air.</p>\n\n<p>Extensive vascular changes are noted including AAA graft.  The vessels are grossly patent.</p>\n\n<p>The prostate and seminal vesicles are within normal limits.  The bladder is unremarkable.</p>\n\n<p>Impression:\n1. Left upper lobe mass with mediastinal adenopathy compatible with lung cancer.</p></div>"
        },
        "code": {
          "coding": [
            {
              "system": "http://loinc.org/",
              "code": "58741-0"
            }
          ],
          "text": "Head to thigh PET"
        },
        "status": "final",
        "issued": "2000-02-11T18:23:00+10:00",
        "subject": {
          "reference": "Patient/siimandy"
        },
        "performer": [{
          "reference": "Organization/siim",
          "display": "Society of Imaging Informatics in Medicine"
        }],
        "identifier": [
          {
            "use": "usual",
            "system": "http://www.siim.org/",
            "value": "4372611551565644"
          }
        ],
        "category": {
          "coding": [
            {
              "system": "http://hl7.org/fhir/v2/0074",
              "code": "RAD"
            }
          ]
        },
        "effectiveDateTime": "2000-02-11",
        "conclusion": "Impression:\n1. Left upper lobe mass with mediastinal adenopathy compatible with lung cancer."
      }
      Meteor.call('createDiagnosticReport', siim_andy_tcga_50_5072_petct);
      
    } else {
      console.log('DiagnosticReports already exist.  Skipping.');
    }
  },
  removeDiagnosticReportById: function(diagnosticReportId){
    check(diagnosticReportId, String);
    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Removing diagnosticReport... ');
      DiagnosticReports.remove({_id: diagnosticReportId});
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  },
  dropDiagnosticReports: function(){
    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Dropping diagnosticReports... ');
      DiagnosticReports.remove({});
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  }

});
