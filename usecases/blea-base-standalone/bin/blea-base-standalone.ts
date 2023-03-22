import * as cdk from 'aws-cdk-lib';
import { BLEABaseStandaloneStack } from '../lib/stack/blea-base-standalone-stack';

// Import parameters for each enviroment
import { DevParameter } from '../parameter';

const app = new cdk.App();

// Create stack for "Dev" environment.
// If you have multiple environments, instantiate stacks with its parameters.
new BLEABaseStandaloneStack(app, 'BLEABaseStandaloneDev', {
  securityNotifyEmail: DevParameter.securityNotifyEmail,
  tags: { Environment: DevParameter.envName },
});
