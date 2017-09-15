import { Card, CardHeader, CardText, CardTitle } from 'material-ui/Card';

import GlassCard from './GlassCard';
import React from 'react';
import VerticalCanvas from './VerticalCanvas';

export class RatesPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div id="RatesPage">
        <VerticalCanvas>
          <GlassCard>
            <CardText>
            <div class="padded pageContent">

                <article class="contentPadding">
                  <h4>Prototyping Expenses</h4>
                  <p>
                    Prototyping is available with a number of different vendors; although we tend to recommend Galaxy, Modulus, and Heroku for getting a project started.  Be aware that none of these hosting providers will sign a Business Associate Agreement, so be sure not to go into production with them or host Protected Health Information (PHI) on these services.
                  </p>
                  <table id="table-horizontal-minimalist" class="table striped-table auto-margins" summary="consulting rates">
                    <tbody>
                      <tr>
                        <td>Galaxy - Pay As You Go Prototype</td>
                        <td>$0.035 / hour / container<br />
                            $26 / month / container</td>
                        <td>https://www.meteor.com/why-meteor/pricing</td>
                      </tr>
                      <tr>
                        <td>Modulus - Pay As You Go Prototype</td>
                        <td>$0.04 / hour / container<br />
                            $29 / month / container</td>
                        <td>https://modulus.io/pricing</td>
                      </tr>
                      <tr>
                        <td>mLab M1 Minimal Mongo Cluster</td>
                        <td>$180 / 30GB / month</td>
                        <td>https://mlab.com/plans/pricing/</td>
                      </tr>
                      <tr>
                        <td>mLab M1 High-Performance Cluster</td>
                        <td>$1390 / 80GB / month</td>
                        <td>https://mlab.com/plans/pricing/</td>
                      </tr>
                      <tr>
                        <td>Github Private Hosting</td>
                        <td>$200 / month / 125 repositories</td>
                        <td>https://github.com/pricing/plans</td>
                      </tr>

                    </tbody>
                  </table>
                </article>

                <article class="contentPadding">
                  <h4>HIPAA Hosting Expenses</h4>
                  <p>
                    The following price list has been gathered from Meteor/Node hosting vendors who offer Business Associate Agreements.  These elevated costs reflect physically secure buildings, network security monitoring, staff training and awareness of HIPAA obligations, docker image deployment fabric, and other HIPAA-compliant devops practices.  Aptible and Modulus hosting costs include basic support contracts and SLA agreements.
                  </p>
                  <table id="table-horizontal-minimalist" class="table striped-table auto-margins" summary="consulting rates">
                    <tbody>
                      <tr>
                        <td>AWS HIPAA Servers</td>
                        <td>$0.532 / hour / server<br />
                        $400 / month  </td>
                        <td>https://aws.amazon.com/ec2/pricing/</td>
                      </tr>
                      <tr>
                        <td>Aptible Enterprise HIPAA Hosting</td>
                        <td>$1,300 / month</td>
                        <td>https://www.aptible.com/pricing/</td>
                      </tr>
                      <tr>
                        <td>Modulus Enterprise HIPAA Hosting</td>
                        <td>$2,000 / month</td>
                        <td>https://modulus.io/pricing</td>
                      </tr>
                      <tr>
                        <td>Extended Validation SSL Certs</td>
                        <td>$25 / month</td>
                        <td>https://www.digicert.com/code-signing/ev-code-signing.htm</td>
                      </tr>
                      <tr>
                        <td>HIPAA Policy Review</td>
                        <td>$1000 / day </td>
                      </tr>
                    </tbody>
                  </table>
                </article>

                <article class="contentPadding">
                  <h4>FDA Readiness Expenses</h4>
                  <p>
                    FDA Readiness involves having a quality assurance initiative in place, and test scripts.  It's important to factor in a 1.5x overhead on task completion turn-around times and sprint velocity when adopting a Quality Assurance Initiative.  This may seem like an extraordinarily high up-front cost; but time and time again it proves to save projects from falling apart when critical bugs arise or disaster strikes.
                  </p>
                  <table id="table-horizontal-minimalist" class="table striped-table auto-margins" summary="consulting rates">
                    <tbody>
                      <tr>
                        <td>Continuous Integration Service</td>
                        <td>$50 / month / containers</td>
                        <td>https://circleci.com/pricing/</td>
                      </tr>
                      <tr>
                        <td>Test Scripts</td>
                        <td>1.5x overhead on tasks </td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </article>


                <article class="contentPadding">
                  <h4>FHIR Architecture Rate Sheet</h4>
                  <p>
                    FHIR Resources are typically implemented as microservices - small self-contained CRUD applets that have a Card UI, and can be 'chained' together.  A weblog is the canonical example of a microservice.  So, too, might a medication inventory management list.  Or a static Questionnaire.  A basic workflow chains a few FHIR resources together; so, for example, a medical device such as a Fitbit or Withings Blood Pressure Cuff might need a Device, Observation, and Patient.  And a Cascading Pipeline involves a dozen or more resources, with collection hooks, worker scripts, scheduled jobs, and other automation.
                  </p>
                    <table id="table-horizontal-minimalist" class="table striped-table auto-margins" summary="consulting rates">
                    <thead>
                    <tr>
                        <th scope="col">Service</th>
                        <th scope="col">Price</th>
                        <th scope="col">TimeFrame</th>
                        <th scope="col">Notes</th>
                    </tr>
                    </thead>
                        <tbody>
                        <tr>
                            <td>Speaking Engagements</td>
                            <td>$2,000</td>
                            <td>1 day</td>
                            <td>Plus travel expenses.</td>
                        </tr>
                        <tr>
                            <td>Basic Microservice</td>
                            <td>$5,000</td>
                            <td>2 weeks</td>
                            <td>Scalable, collaborative, implementation of a FHIR resource.</td>
                        </tr>
                        <tr>
                            <td>Basic Workflow</td>
                            <td>$20,000</td>
                            <td>2 months</td>
                            <td>Typically consisting of 3 to 5 microservices.</td>
                        </tr>
                        <tr>
                            <td>Cascading Pipeline</td>
                            <td>$50,000</td>
                            <td>4 - 6 months</td>
                            <td>Workflows of a dozen or more microservices.</td>
                        </tr>

                        </tbody>
                    </table>
                </article>

                <article class="contentPadding">
                  <h4>Support Contracts</h4>
                  <p>
                    Support contracts will get somebody answering your phone call in the middle of the night, working through the weekend, or otherwise attending meetings and providing face time.
                  </p>
                  <table id="table-horizontal-minimalist" class="table striped-table auto-margins" summary="consulting rates">
                    <tbody>
                      <tr>
                        <td>Galaxy - Priority Support</td>
                        <td>$149/month</td>
                        <td>https://www.meteor.com/why-meteor/pricing</td>
                      </tr>
                      <tr>
                        <td>Galaxy - Enterprise Support</td>
                        <td>$1,499/month</td>
                        <td>https://www.meteor.com/why-meteor/pricing</td>
                      </tr>
                      <tr>
                        <td>Meteor Production Support</td>
                        <td>$1,599/month</td>
                        <td>http://www.meteor.com/why-meteor/pricing</td>
                      </tr>
                      <tr>
                        <td>Meteor Enterprise Support</td>
                        <td>$2,999/month</td>
                        <td>http://www.meteor.com/why-meteor/pricing</td>
                      </tr>
                      <tr>
                        <td>Clinical Meteor Basic Support</td>
                        <td>$1,300/month</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Clinical Meteor Premium Support</td>
                        <td>$25,000/quarter</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Symptomatic.io Premium Support</td>
                        <td>$50,000/quarter</td>
                        <td>symptomatic.io</td>
                      </tr>
                    </tbody>
                  </table>
                </article>

                <article class="contentPadding">
                  <h4>Turn-Key Clinical Deployments</h4>
                  <p>
                    Clinical Deployments use a Wordpress model; meaning apps are forked, modified, and run locally in various datacenters.   We provide Turn Key deployments with various HIPAA compliant hosting solutions, and extra infrastructure support on our Symptomatic.io cloud.  The following prices are inclusive of HIPAA Business Associate Agreements.
                  </p>
                  <table id="table-horizontal-minimalist" class="table striped-table auto-margins" summary="consulting rates">
                    <tbody>
                      <tr>
                        <td>Barebones HIPAA Installation</td>
                        <td>$600/month + tax + consulting</td>
                        <td>AWS Server, SSL Certs</td>
                      </tr>
                      <tr>
                        <td>Minimal Private HIPAA Installation</td>
                        <td>$1,150/month + tax + consulting</td>
                        <td>AWS Server, SSL Certs, Private Github, Continuous Integration</td>
                      </tr>
                      <tr>
                        <td>Basic HIPAA Startup Installation</td>
                        <td>$1,875/month + tax + consulting</td>
                        <td>Aptible Paas Layer, Private HIPAA App</td>
                      </tr>
                      <tr>
                        <td>Basic HIPAA Cloud Installation</td>
                        <td>$1,755/month + tax + consulting</td>
                        <td>Modulus PaaS Layer, Private HIPAA App</td>
                      </tr>
                      <tr>
                        <td>Turnkey Galaxy Installation</td>
                        <td>$6,500/month + tax + consulting</td>
                        <td>Turnkey Minimal, Galaxy Enterprise, Enterprise Support</td>
                      </tr>
                      <tr>
                        <td>Turnkey Clinical Installation</td>
                        <td>$10,000/month + tax + consulting</td>
                        <td>Turnkey Galaxy App, FHIR Server License</td>
                      </tr>
                      <tr>
                        <td>Symptomatic Practice Management</td>
                        <td>$20,000/month + tax + consulting</td>
                        <td>Turnkey Clinical Installation; Symptomatic Suite License</td>
                      </tr>
                    </tbody>
                  </table>
                </article>

                <article class="contentPadding">
                  <h4>Consulting</h4>
                  <p>
                    Please review our standard contract before approaching us with projects.  The salient points to be begin with are that a) we protect our ability to work in the healthcare industry by focusing on open-source software so we can't be muscled out, which means that b) we generally don't accept simple work-for-hire contracts; rather, we try to c) focus on projects that are bounty-sourced, colicensed, or involve equity involvement.   And regardless of the licensing, we believe d) that test-driven-development is non-negotiable, and e) breaking the build or abandoning the TDD process is cause for termination of the contract.  Beyond that, f) we believe in diversity and equal opportunity, and you should too if you want to work with us.
                  </p>
                  <h4>
                    <a href="https://docs.google.com/document/d/1Uw2CWDWN0jXzLkTDtx6i4S9VAdKfFrfvOj7eoKfRC-4/edit?usp=sharing"><i class="fa fa-file"></i>Standard Consulting Contract</a>
                  </h4>
                </article>


            </div>

            </CardText>
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}
export default RatesPage;



