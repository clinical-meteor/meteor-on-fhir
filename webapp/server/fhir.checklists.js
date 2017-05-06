Meteor.methods({
  initializeChecklists: function (){
    console.log('Initializing Lists', Lists.find().fetch());

    var data = [
      {name: "Collect Blood Specimen",
       url: "http://who.int/csr/resources/publications/ebola/blood-collect-en.pdf",
       items: [
         "Step 1a:  Assemble equipment for collecting blood.",
         "Step 1b: Assemble equipment for preventing infections.",
         "Step 1c: Fill out patient documentation.",
         "Step 1d: Assemble materials for packaging of samples.",
         "Step 2a: Perform hand hygiene.",
         "Step 2b: Put on a gown.",
         "Step 2c: Put on face protection.",
         "Step 2d: Put on gloves (over gown cuffs).",
         "Step 3a: Prepare room.",
         "Step 3b: Identify and prepare the patient.",
         "Step 3c: Select the site, preferably at the bend of the elbow.",
         "Step 3d. Apply a tourniquet around the arm.",
         "Step 3e: Ask the patient to form a fist so that the veins are more prominent.",
         "Step 3f: Disinfect the area where you will put the needle.",
         "Step 3g: When using vacuum extraction system with holder, insert the blood collector tube into the holder.",
         "Step 3h: Anchor the vein.",
         "Step 3i: Perform the blood draw.",
         "Step 3j: When blood starts to flow, ask patient to open his/her hand.",
         "Step 3k: Once sufficient blood has been collected (minimum 5ml), release the tourniquet BEFORE withdrawing the needle.",
         "Step 3l: Withdraw the needle gently.",
         "Step 3l: Withdraw the needle gently.",
         "Step 3m: Remove blood collector tube from holder and put into rack.",
         "Step 3n: Put needle into leak-proof and puncture resistant sharps container.",
         "Step 3o: Stop the bleeding and clean the skin.",
         "Step 3p: Put items that drip blood or have body fluids on them into the infectious waste bag for destruction.",
         "Step 4a: Take the blood tube from the tray and wipe the blood tube with a disposable paper towel.",
         "Step 4c: Place all items that came into contact with blood into the infectious waste bag for destruction.",
         "Step 4d: Protect the sample from breaking during transport by wrapping the tube of blood in a paper towel.",
         "Step 4e: Ask the designated assistant to approach the patient room, without entering.",
         "Step 4f: The person who has collected the blood sample should put the wrapped tube of blood into the plastic leak- proof packaging container.",
         "Step 4g: Have the designated, gloved assistant tightly close the top of the plastic leak- proof packaging container.",
         "Step 5a: Remove the gloves.",
         "Step 5b: Remove the gown",
         "Step 5c: Perform Hand hygiene.",
         "Step 5d: Take off face protection",
         "Step 5e: Perform Hand hygiene."
       ]
      },
      {name: "Change Bed Linens",
       url: "http://www.suagm.edu/umet/biblioteca/Reserva_Profesores/maritza_acevedo_nurs_230_101/cama_abierta_y_ocupada.pdf",
       items: [
         "Introduced self and verified patient’s identity.",
         "Explained procedure to patient.",
         "Gathered appropriate equipment.",
         "Performed hand hygiene and observed other appropriate infection control procedures.",
         "Provided for patient privacy.",
         "Placed fresh linen on patient’s chair or overbed table.",
         "Assessed and assisted patient out of bed using assistance devices, if needed.",
         "Raised the bed to a comfortable working height.",
         "Applied clean gloves if linens and equipment were soiled with secretions and/or excretions.",
         "Stripped the bed.",
         "Applied the bottom sheet and drawsheet.",
         "Moved to the other side and secured the bottom linens.",
         "Applied or completed the top sheet, blanket, and spread.",
         "Put clean pillowcases on the pillows and placed pillow(s) at head of bed.",
         "Provided for patient comfort and safety."
       ]
      },
      {name: "MRI Safety Checklist",
       url: "http://www.rcht.nhs.uk/DocumentsLibrary/RoyalCornwallHospitalsTrust/Websites/Internet/OurServices/AZServices/C/ClinicalImaging/CHA2840.pdf",
       items: [
         "Do you have a cardiac pacemaker/defibrillator?",
         "Have you ever had a cardiac pacemaker/defibrillator?",
         "Have you ever had heart surgery?",
         "Do you have a neuro-stimulator?",
         "Have you ever had any type of electronic, mechanical, or magnetic Implant?",
         "Have you ever had surgery to your brain?",
         "Do you have a programmable hydrocephalus shunt?",
         "Have you ever had surgery to your ears?",
         "Have you ever had surgery to your eyes?",
         "Have you ever had any operations involving the use of metal implants, plates, or clips?",
         "Have you ever had any metal fragments in your eyes?",
         "Have you ever had any metal fragments in any other part of your body?",
         "Have you had any surgery in any part of your body in the past 6 weeks?",
         "Do you have a prosthetic limb, eye or other artificial device not already mentioned?",
         "Are you wearing any medication patches? (eg. Nicotine, HRT patch)",
         "Do you have any wound dressings?",
         "Have you had a previous MRI scan?",
         "Could you be pregnant?",
         "Are you breast-feeding?"
       ]
      },
      {
        name: "Incident Response Containment Checklist",
        url: "https://github.com/catalyzeio/policies",
        items: [
          "1. Review any information that has been collected by the Security Officer or any other individual investigating the security incident.",
          "2. Secure the network perimeter.",
          "3. Securely connect to the affected system over a trusted connection.",
          "4. Retrieve any volatile data from the affected system.",
          "5. Determine the relative integrity and the appropriateness of backing the system up.",
          "6. If appropriate, back up the system.",
          "7. Change the password(s) to the affected system(s).",
          "8. Determine whether it is safe to continue operations with the affect system(s).",
          "9. If it is safe, allow the system to continue to function.",
          "10. Complete any documentation relative to the security incident on the SIR Form.",
          "11. Apprise Senior Management of progress.",
          "12. Notify affected Customers and Partners with relevant updates as needed."
        ]
      },
      {
        name: "Incident Response Eradication Checklist",
        url: "https://github.com/catalyzeio/policies",
        items: [
          "1. Determine symptoms and cause related to the affected system(s).",
          "2. Strengthen the defenses surrounding the affected system(s), where possible.",
          "3. Increase in network perimeter defenses.",
          "4. Increase in system monitoring defenses.",
          "5. Remediate any security issues within the affected system, such as removing unused services/general host hardening techniques.",
          "6. Conduct a detailed vulnerability assessment to verify all the holes/gaps that can be exploited have been addressed.",
          "7. If additional issues or symptoms are identified, take appropriate preventative measures to eliminate or minimize potential future compromises.",
          "8. Update the Security Incident Documentation with the information learned from the vulnerability assessment, including the cause, symptoms, and the method used to fix the problem with the affected system(s).",
          "9. Apprise Senior Management of the progress.",
          "10. Continue to notify affected Customers and Partners with relevant updates as needed."
        ]
      },
      {
        name: "Incident Response Recovery Checklist",
        url: "https://github.com/catalyzeio/policies",
        items: [
          "1. Determines if the affected system(s) have been changed in any way.",
          "2. If they have, restores the system to its proper, intended functioning (“last known good”).",
          "3. Once restored, validate that the system functions the way it was intended/had functioned in the past. This may require the involvement of the business unit that owns the affected system(s).",
          "4. If operation of the system(s) had been interrupted (i.e., the system(s) had been taken offline or dropped from the network while triaged), restart the restored and validated system(s) and monitor for behavior.",
          "5. If the system had not been changed in any way, but was taken offline (i.e., operations had been interrupted), restart the system and monitor for proper behavior.",
          "6. Update the documentation with the detail that was determined during this phase.",
          "7. Apprise Senior Management of progress.",
          "8. Continue to notify affected Customers and Partners with relevant updates as needed."
        ]
      },
      {
        name: "Incident Response Followup Checklist",
        url: "https://github.com/catalyzeio/policies",
        items: [
          "1. Responders to the security incident (Security Incident Response Team) meet to review the documentation collected during the security incident.",
          "2. Create a “lessons learned” document and attach it to the completed SIR Form.",
          "3. Evaluate the cost and impact of the security incident to Catalyze using the documents provided by the SIRT and the technical security resource.",
          "4. Determine what could be improved.",
          "5. Communicate these findings to Senior Management for approval and for implementation of any recommendations made post-review of the security incident.",
          "6. Carry out recommendations approved by Senior Management; sufficient budget, time and resources should be committed to this activity.",
          "7. Close the security incident."
        ]
      }
    ];
    var timestamp = (new Date()).getTime();

    data.forEach(function (list){

      var newList = {
        "resourceType": "List",
        "code": {
          "text": list.name
        },
        "note": list.url,
        "source": {
          "reference": "System/system"
        },
        "status": "current",
        "date": new Date(),
        "mode": "changes",
        "entry": []
      };


      list.items.forEach(function(item){
        var newItem = {
          "flag": {
            "text": "Pending",
            "coding": [
              {
                "system": "http://hl7.org/fhir/ValueSet/order-status",
                "code": "pending",
                "display": "Pending"
              }
            ]
          },
          "deleted": false,
          "date": new Date(),
          "item": {
            "display": item
          }
        };

        newList.entry.push(newItem);
      });

      if (Lists.find({'code.text': newList.code.text}).count() === 0) {
        var listId = Lists.insert(newList);
        console.log('New List Created: ' + listId);
      }
    });
  },
  dropChecklists: function (){
    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Dropping lists... ');
      Lists.find().forEach(function(list){
        Lists.remove({_id: list._id});
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }  
  }
});
