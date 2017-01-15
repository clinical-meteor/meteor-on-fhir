import { MyGenotype } from '/imports/api/genotype/MyGenotype';
import { Statistics } from '/imports/api/statistics/statistics';



export const GeneticAlgorithms = {
  parse23andMeFile: function(fileContent){
    console.log("Received a 23andMe file from the browser....");
    //console.log("fileContent", fileContent);

    // var reader = new FileReader();
    //
    // reader.onload = function(e) {
    //   fileContent = reader.result;
      fileContentArray = fileContent.split('\n');
      console.log("Number of lines:  ", fileContentArray.length);
      console.log("");

      // if (fileContentArray[0].includes("23andMe")) {
      //   console.log("This appears to be a 23andMe datafile!");

        var stats = Statistics.find({}, {limit: 1, sort: {date: -1}}).fetch()[0];
        Statistics.update({_id: stats._id}, {$set: {
          'progressMax': fileContentArray.length,
          'counts.genotype': MyGenotype.find().count()
        }});

        var count = MyGenotype.find().count();
        // if (stats.count.genotype > 0) {
        //   count = stats.count.genotype;
        // }

        fileContentArray.forEach(function(line){
          var lineArray = line.split('\t');

            if (lineArray[0].substring(0,2) ==="rs") {
              if (count%1000 === 0) {
                Statistics.update({_id: stats._id}, {$set: {
                  'counts.genotype': count
                }});
              }

              var newRecord = {
                marker: null,
                chromosome: null,
                position: null,
                genotype: null
              };

              lineArray.forEach(function(cell){
                if (cell.length > 0) {
                  if (newRecord.marker === null) {
                    newRecord.marker = cell;
                  } else {
                    if (newRecord.chromosome === null) {
                      newRecord.chromosome = parseInt(cell);
                    } else {
                      if (newRecord.position === null) {
                        newRecord.position = parseInt(cell);
                      } else {
                        if (newRecord.genotype === null) {
                          newRecord.genotype = cell.substring(0,2);
                        }
                      }
                    }
                  }
                }
              });

              if(process.env.NODE_ENV === "test"){
                if(process.env.TRACE){
                  console.log("gene", count);
                }
              }
              MyGenotype.insert(newRecord);
            }
            count++;
        });
      //}
    //}
    //reader.readAsText(file);
    Statistics.update({_id: stats._id}, {$set: {
      'counts.genotype': count
    }});

  }
}
