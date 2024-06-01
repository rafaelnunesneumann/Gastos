import React from "react";
import { Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

const Chart = ({ data }: any) => {
  return (
    <View style={{ backgroundColor: "white", borderRadius: 8, padding: 8 }}>
      <BarChart
        barWidth={16}
        noOfSections={5}
        barBorderRadius={4}
        frontColor="#FF4646"
        data={data}
        yAxisThickness={0}
        xAxisThickness={0}
        isAnimated
        hideRules
        renderTooltip={(item: { value: any }) => {
          return (
            <View
              style={{
                marginLeft: -6,
                backgroundColor: "#333333",
                paddingHorizontal: 6,
                paddingVertical: 4,
                borderRadius: 4,
              }}
            >
              <Text style={{ color: "white" }}>{item.value}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Chart;
