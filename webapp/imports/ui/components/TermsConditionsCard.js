import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { CardTitle, CardText, CardHeader } from 'material-ui/Card';
import { Link } from 'react-router';
import { Table } from 'react-bootstrap';

import LinearProgress from 'material-ui/LinearProgress';
import {orange500, blue500} from 'material-ui/styles/colors';


export class TermsConditionsCard extends React.Component {
  constructor(props) {
    super(props);
  }
getMeteorData() {
  let data = {
    style: {
      page:{
        minHeight: '0px'
      }
    }
  };

  return data;
}

  render(){
    var style = {
      marketingImage: {
        width: '80%',
        position: 'relative',
        left: '10%'
      },
      sectionHeader: {
        borderTop: '1px solid lightgray',
        width: '100%'
      },
      page: {
        minHeight: '1024px'
      }
    };

    return (
      <div>
         <CardText style={{textAlign: 'justify'}}>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fermentum convallis nunc eget finibus. Donec sodales mi vel massa vestibulum, non vestibulum felis posuere. Donec luctus pretium nunc, ac maximus tellus interdum ac. Donec elementum sollicitudin molestie. Aliquam cursus aliquam leo, sit amet porta felis rutrum ut. Nam finibus augue eget turpis luctus pharetra. Pellentesque dignissim ex quis mauris porttitor, quis mattis erat rhoncus. Aenean quis augue nibh. Suspendisse semper lacus non nibh euismod, non volutpat quam consequat.</p>
          <p>Donec id pretium purus. Sed malesuada non leo vel consequat. Ut viverra malesuada ante, ut mollis dui tempus ac. Nulla semper felis purus, interdum lobortis quam porta faucibus. Donec felis quam, consequat fringilla mattis ac, imperdiet sed lacus. In fermentum, magna eu commodo cursus, elit felis viverra leo, vel volutpat nunc risus eu nisl. Nulla mollis, erat nec malesuada porta, est purus vulputate metus, vel iaculis sem arcu vitae metus. Mauris porta erat aliquam rutrum posuere. Ut porta magna vel fringilla facilisis. Etiam cursus, dui id egestas ullamcorper, tortor sem hendrerit diam, eget viverra nunc arcu eget ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer ultricies ante vel efficitur malesuada.</p>
          <p>Etiam tempus massa in mi condimentum, vitae ullamcorper turpis pellentesque. Curabitur condimentum vestibulum eros, sit amet pellentesque ipsum rutrum sed. Nam a pulvinar arcu, non venenatis ligula. Maecenas vestibulum congue interdum. Aenean a arcu ut augue condimentum laoreet eu sed lacus. Nulla at tortor pretium, finibus sapien at, porta eros. Fusce rutrum finibus purus, quis hendrerit libero fermentum nec. Quisque sit amet metus congue, scelerisque metus ut, pharetra nisl. Mauris quis placerat nibh.</p>
          <p>Phasellus ullamcorper lorem quis arcu efficitur sagittis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean aliquet sagittis erat ac scelerisque. Etiam ultricies mattis est nec efficitur. Fusce quis lacinia lorem, at pharetra ipsum. Etiam ullamcorper metus nec auctor viverra. Sed et lobortis tortor. Quisque fringilla odio porttitor lectus accumsan tincidunt. Sed at magna nec risus pulvinar vehicula vitae at dui. Donec ante lectus, suscipit congue auctor eu, tincidunt ut velit. Donec tempor vitae nisl quis varius. Aliquam a turpis at est consequat faucibus. Maecenas imperdiet eleifend arcu, ac efficitur massa facilisis vehicula. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
          <p>Quisque ac interdum nunc, sed efficitur magna. Sed condimentum nulla vel eleifend vulputate. In hac habitasse platea dictumst. Nullam facilisis cursus nunc et viverra. In augue dolor, luctus vitae luctus sit amet, tristique ut nibh. Maecenas dignissim quam in nisi pulvinar, eu ultrices arcu dapibus. Fusce vehicula, tellus non fringilla pulvinar, nulla nulla aliquet elit, et pulvinar dui elit quis dui.</p>
          <p>Nullam ac lacus posuere, lobortis arcu sed, porta enim. Morbi iaculis lorem tellus, ac euismod nisl auctor ut. Donec fringilla posuere eleifend. Sed fermentum, orci id iaculis tincidunt, diam ligula lacinia ipsum, et pretium sem lacus a elit. Pellentesque vel mi vitae quam porttitor aliquet vel vehicula tellus. Maecenas semper malesuada maximus. Suspendisse vel eros interdum, imperdiet turpis sagittis, convallis augue. Quisque neque eros, tempor quis tellus varius, consequat rhoncus nunc. Nam est enim, semper commodo auctor id, mattis in augue. Vestibulum finibus, nulla in hendrerit lacinia, lorem massa pellentesque eros, vel auctor neque neque ac turpis. Aenean euismod tellus et arcu auctor vulputate. Integer in eros nec tortor venenatis elementum.</p>
          <p>In eros purus, dictum nec convallis id, suscipit eu augue. Vestibulum tempus convallis maximus. In odio tortor, vestibulum sed aliquam et, cursus tempor ipsum. Cras ac lacinia ligula. Etiam quis imperdiet lectus, ut vulputate neque. Aenean nisl justo, egestas quis rhoncus ac, euismod porttitor elit. Etiam sagittis mauris at leo congue, at elementum tellus blandit. Donec eget viverra erat, sodales fermentum magna. Pellentesque orci felis, imperdiet in magna a, maximus cursus eros. Maecenas mollis lectus in ligula ullamcorper, scelerisque hendrerit erat semper. Vestibulum mattis, augue commodo laoreet porttitor, eros nisi egestas dolor, vel venenatis massa augue ut sapien. Sed id turpis hendrerit lectus fringilla egestas. Integer faucibus, est non tempor sollicitudin, eros mauris pellentesque massa, ut pellentesque quam nulla ut massa. Quisque iaculis convallis diam, eu feugiat leo tincidunt scelerisque. Integer felis massa, dignissim a mi vitae, laoreet bibendum orci.</p>
          <p>Sed quis erat eget sem venenatis maximus a a tortor. Sed ut augue tincidunt, ullamcorper nisi a, vehicula lectus. Aliquam convallis tincidunt dignissim. Cras porta eget est eu porta. Aliquam sit amet elit luctus, scelerisque sapien sed, tincidunt sem. Cras blandit tortor justo. Aliquam erat volutpat. Sed at est suscipit, rhoncus dolor et, feugiat turpis. Sed a pulvinar neque, eu ultricies nibh. Praesent sed sapien euismod, venenatis purus quis, maximus tortor. Quisque facilisis tellus a purus lobortis, sed egestas lacus consequat. Quisque ligula ligula, dignissim et leo vitae, mattis egestas tellus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Maecenas pulvinar ultrices tempus. Cras faucibus dui lacus.</p>
          <p>Maecenas eleifend aliquet placerat. Praesent quam ligula, elementum ut felis eget, faucibus ornare augue. Nam tempor tellus et est egestas feugiat. Sed quis viverra massa. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam ac leo lorem. In nec porta lorem. Morbi nec erat dignissim, interdum enim eu, maximus ipsum. Praesent suscipit magna eu semper mollis. Fusce ut ullamcorper ante, vel gravida dolor. Integer congue et nisi at efficitur. Nullam cursus molestie bibendum. Maecenas vel neque vel leo gravida sollicitudin eu ac libero. Praesent eu laoreet orci.</p>
          <p>Cras in ipsum velit. Nam aliquam turpis non arcu euismod, quis imperdiet neque laoreet. Morbi luctus sed dui a efficitur. Phasellus porta nisl diam, non iaculis nisl malesuada eu. Duis volutpat rutrum libero, ac commodo eros tempus sit amet. Aenean tempor venenatis tellus id rutrum. Mauris sapien nibh, consectetur et ex placerat, eleifend accumsan sapien. Donec a ipsum ipsum. Integer eget tincidunt velit, et dapibus diam. Vivamus congue vestibulum elementum.</p>
         </CardText>
      </div>
    );
  }
}
ReactMixin(TermsConditionsCard.prototype, ReactMeteorData);
export default TermsConditionsCard;