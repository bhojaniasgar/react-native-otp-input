import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import React from 'react';
import { Platform } from 'react-native';

export default function TabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Icon sf={{ default: 'house', selected: 'house.fill' }} />
        <Label>Basic</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="customized">
        <Icon sf={{ default: 'paintbrush', selected: 'paintbrush.fill' }} />
        <Label>Custom</Label>
      </NativeTabs.Trigger>

      {Platform.OS === 'ios' && (
        <>
          <NativeTabs.Trigger name="autofill">
            <Icon sf={{ default: 'bolt', selected: 'bolt.fill' }} />
            <Label>Auto-Fill</Label>
          </NativeTabs.Trigger>

          <NativeTabs.Trigger name="sizes">
            <Icon sf={{ default: 'ruler', selected: 'ruler.fill' }} />
            <Label>Sizes</Label>
          </NativeTabs.Trigger>
        </>
      )}
      <NativeTabs.Trigger name="error">
        <Icon sf={{ default: 'exclamationmark.triangle', selected: 'exclamationmark.triangle.fill' }} />
        <Label>Error</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="advanced">
        <Icon sf={{ default: 'gearshape', selected: 'gearshape.fill' }} />
        <Label>Advanced</Label>
      </NativeTabs.Trigger>


    </NativeTabs>
  );
}
