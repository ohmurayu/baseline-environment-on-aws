import * as cdk from 'aws-cdk-lib';
import { BLEABaseCTGuestPipelinesStack } from '../lib/stack/blea-base-ct-guest-via-cdk-pipelines-stack';

// Import parameters for each enviroment
import { DevPipelineParameter, DevParameter } from '../parameter';

const app = new cdk.App();

if (
  !DevPipelineParameter.sourceRepository ||
  !DevPipelineParameter.sourceBranch ||
  !DevPipelineParameter.sourceConnectionArn
) {
  throw new Error("'sourceRepository', 'sourceBranch' and 'sourceConnectionArn' are required.");
}

// Create stack for "Dev" environment.
// If you have multiple environments, instantiate stacks with its parameters.
new BLEABaseCTGuestPipelinesStack(app, 'DevBLEABaseCTGuestPipeilne', {
  targetParameters: [DevParameter],
  sourceRepository: DevPipelineParameter.sourceRepository,
  sourceBranch: DevPipelineParameter.sourceBranch,
  sourceConnectionArn: DevPipelineParameter.sourceConnectionArn,
});
