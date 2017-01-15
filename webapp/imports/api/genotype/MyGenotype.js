import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const MyGenotype = new Mongo.Collection('MyGenotype');

MyGenotype.schema = new SimpleSchema({
  marker: {
    type: String,
    optional: true,
    label: 'marker (snp)'
  },
  chromosome: {
    type: Number,
    optional: true,
    label: 'Chromosome'
  },
  position: {
    type: Number,
    optional: true,
    label: 'Position'
  },
  variants: {
    type: String,
    optional: true,
    label: 'Genotype'
  },
  genotype: {
    type: String,
    optional: true,
    label: 'Genotype'
  },
  gene: {
    type: String,
    optional: true,
    label: 'Genotype'
  },
  url: {
    type: String,
    optional: true,
    label: 'Genotype'
  }
});

MyGenotype.attachSchema(MyGenotype.schema);
