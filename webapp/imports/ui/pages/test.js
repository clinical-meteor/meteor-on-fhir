import React from 'react';

import { PageContainer } from '../components/PageContainer';
import { GlassCard } from '../components/GlassCard';
import { GlassApp } from '/imports/ui/components/GlassApp';

export class Test extends React.Component {
  componentDidMount() {
    //handleLogin({ component: this });
  }

  render() {
    return (
      <PageContainer>
        <GlassCard />
      </PageContainer>
    );
  }
}
