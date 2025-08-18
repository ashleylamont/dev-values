import { useDevValuesContext } from "../data/context.ts";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
} from "recharts";
import { DEV_VALUES_AXES, DEV_VALUES_QUESTIONS } from "../data/data.ts";
import { useMemo } from "react";

export function Completed() {
  const { state, restart } = useDevValuesContext();

  const axisSizes = Object.fromEntries(
    DEV_VALUES_AXES.map((axis) => [
      axis.id,
      DEV_VALUES_QUESTIONS.filter(
        (question) =>
          question.positiveAxes.includes(axis.id) ||
          question.negativeAxes.includes(axis.id),
      ).length,
    ]),
  );

  const bidirectionalResults = useMemo<
    {
      axisId: (typeof DEV_VALUES_AXES)[number]["id"];
      label: string;
      value: number;
    }[]
  >(() => {
    if (state.status !== "COMPLETED") {
      return [];
    }
    return DEV_VALUES_AXES.flatMap(
      (axis) =>
        [
          {
            axisId: axis.id,
            label: `${axis.positiveLabel}`,
            value: state.result[axis.id] || 0,
          },
          {
            axisId: axis.id,
            label: axis.negativeLabel,
            value: -1 * (state.result[axis.id] || 0),
          },
        ] satisfies {
          axisId: (typeof DEV_VALUES_AXES)[number]["id"];
          label: string;
          value: number;
        }[],
    ).sort((a, b) => {
      const positiveLabels = DEV_VALUES_AXES.map((axis) => axis.positiveLabel);
      const isAPositive = positiveLabels.includes(a.label);
      const isBPositive = positiveLabels.includes(b.label);
      if (isAPositive === isBPositive) {
        return a.axisId.localeCompare(b.axisId);
      }
      return isAPositive ? -1 : 1;
    });
  }, [state]);

  if (state.status !== "COMPLETED") {
    return <p>Looks like something went wrong. You shouldn't see this.</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-2xl mb-4">Your Results</h2>
      <div className="mb-4">
        <RadarChart width={800} height={400} data={bidirectionalResults}>
          <PolarGrid />
          <PolarAngleAxis dataKey={"label"} />
          <PolarRadiusAxis angle={2} domain={[-8, 8]} />
          <Radar
            name="Your devValues"
            dataKey="value"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
        </RadarChart>
      </div>
      <div className="mb-4 flex-col flex gap-1">
        {DEV_VALUES_AXES.map((axis) => (
          <div className="border-2 border-gray-300 rounded p-2" key={axis.id}>
            <p className="text-center font-bold">{axis.name}</p>
            <p className="text-center text-xs text-gray-500">
              {axis.description}
            </p>
            <p className="text-center">
              {state.result[axis.id] <= -4.5 && axis.farNegativeDescription}
              {state.result[axis.id] <= -3 &&
                state.result[axis.id] > -4.5 &&
                axis.moderateNegativeDescription}
              {state.result[axis.id] < -1 &&
                state.result[axis.id] > -3 &&
                axis.lightNegativeDescription}
              {state.result[axis.id] <= 1 &&
                state.result[axis.id] >= -1 &&
                axis.neutralDescription}
              {state.result[axis.id] > 1 &&
                state.result[axis.id] < 3 &&
                axis.lightPositiveDescription}
              {state.result[axis.id] >= 3 &&
                state.result[axis.id] < 4.5 &&
                axis.moderatePositiveDescription}
              {state.result[axis.id] >= 4.5 && axis.farPositiveDescription}
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="w-40 text-right text-blue-700 font-bold">
                {axis.positiveLabel}
              </span>
              <div className="flex-1 h-4 bg-red-500 rounded-sm w-20  overflow-hidden">
                <div
                  className="h-full bg-blue-500"
                  style={{
                    width: `${(((state.result[axis.id] || 0) + 8) * 100) / 16}%`,
                  }}
                />
              </div>
              <span className="w-40 text-red-700 font-bold">
                {axis.negativeLabel}
              </span>
            </div>
          </div>
        ))}
      </div>
      <textarea
        readOnly
        className="mb-4 w-250 h-60 p-2 border border-gray-300 rounded resize-none"
        value={
          `devValues Results:\n` +
          DEV_VALUES_AXES.map(
            (axis) =>
              `${axis.name} (between -${axisSizes[axis.id]} (${axis.negativeLabel}) and ${axisSizes[axis.id]} (${axis.positiveLabel})): ${state.result[axis.id] || 0}`,
          ).join("\n")
        }
      />
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={restart}
      >
        Restart Questionnaire
      </button>
    </div>
  );
}
