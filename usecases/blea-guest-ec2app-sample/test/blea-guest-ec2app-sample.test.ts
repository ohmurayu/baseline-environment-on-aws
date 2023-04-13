import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';

import { BLEAEc2AppStack } from '../lib/stack/blea-guest-ec2app-sample-stack';
import { devParameter } from '../parameter';
const app = new cdk.App();

describe('BLEAEc2App App', () => {
  test('Snapshot test for BLEAEc2App Stack', () => {
    const stack = new BLEAEc2AppStack(app, 'Dev-BLEAEc2App', {
      monitoringNotifyEmail: devParameter.monitoringNotifyEmail,
      monitoringSlackWorkspaceId: devParameter.monitoringSlackWorkspaceId,
      monitoringSlackChannelId: devParameter.monitoringSlackChannelId,
      vpcCidr: devParameter.vpcCidr,
      tags: {
        Repository: 'aws-samples/baseline-environment-on-aws',
        Environment: devParameter.envName,
      },
      // Account and Region on test
      //  cdk.process.env.* returns undefined, and cdk.Stack.of(this).* returns ${Token[Region.4]} at test time.
      //  In such case, RegionInfo.get(cdk.Stack.of(this).region) returns error and test will fail.
      //  So we pass 'ap-northeast-1' as region code.
      env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION ?? 'ap-northeast-1',
      },
    });
    expect(Template.fromStack(stack)).toMatchSnapshot();
  });
});
