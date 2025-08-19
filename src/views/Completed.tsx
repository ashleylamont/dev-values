import { useDevValuesContext } from "../data/context.ts";
import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
} from "recharts";
import { DEV_VALUES_AXES, DEV_VALUES_QUESTIONS } from "../data/data.ts";
import { useMemo, useState } from "react";
import { Button } from "../components/button.tsx";
import {
  type AxisScores,
  bestArchetypes,
  buildBadges,
} from "../data/archetypes.ts";

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

  const normalisedResults =
    state.status === "COMPLETED"
      ? Object.fromEntries(
          Object.entries(state.result).map(([axisId, value]) => [
            axisId,
            (value / axisSizes[axisId]) * 100,
          ]),
        )
      : {};

  const badges = buildBadges(normalisedResults as AxisScores);
  const topMatches = bestArchetypes(normalisedResults as AxisScores, 1);

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

  const [compareResults, setCompareResults] = useState<Record<
    string,
    number
  > | null>(null);

  async function getResultsFromClipboard() {
    const text = await navigator.clipboard.readText();
    const lines = text.split("\n").map((line) => line.trim());
    const newResults: Record<string, number> = {};
    for (const line of lines) {
      // Assert that the lines are in the right format, and match known axes
      const match = line.match(/^([a-zA-Z_]+)=(-?(?:\d+\.)?\d+)$/);
      if (match) {
        const axisId = match[1];
        const value = parseFloat(match[2]);
        if (DEV_VALUES_AXES.some((axis) => axis.id === axisId)) {
          newResults[axisId] = value;
        } else {
          alert(
            'Invalid data to compare. Make sure it is in the format "axisId=value"',
          );
          return;
        }
      }
    }
    if (Object.keys(newResults).length === 0) {
      alert("No valid results found to compare.");
      return;
    }
    setCompareResults(newResults);
  }

  async function saveResultsToClipboard() {
    if (state.status !== "COMPLETED") {
      alert("No results to copy. Please complete the questionnaire first.");
      return;
    }
    const text = DEV_VALUES_AXES.map(
      (axis) => `${axis.id}=${state.result[axis.id] || 0}`,
    ).join("\n");
    await navigator.clipboard.writeText(text);
    alert("Results copied to clipboard!");
  }

  const combinedResultsForChart = useMemo(() => {
    return bidirectionalResults.map((result) => {
      const normalisedBaseValue =
        (result.value / axisSizes[result.axisId]) * 100;
      if (compareResults) {
        const axis = DEV_VALUES_AXES.find((axis) => axis.id === result.axisId)!;
        const isNegative = result.label === axis.negativeLabel;
        const compareValue = compareResults[result.axisId] || 0;
        const normalisedCompareValue =
          (compareValue / axisSizes[result.axisId]) * 100;
        return {
          ...result,
          value: normalisedBaseValue,
          compareValue: normalisedCompareValue * (isNegative ? -1 : 1),
        };
      }
      return {
        ...result,
        value: normalisedBaseValue,
      };
    });
  }, [axisSizes, bidirectionalResults, compareResults]);

  if (state.status !== "COMPLETED") {
    return <p>Looks like something went wrong. You shouldn't see this.</p>;
  }

  const bestArchetype = topMatches[0]?.archetype;

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-2xl mb-4 underline">Your Results</h2>
      {bestArchetype && (
        <hgroup>
          <h3 className="text-lg mb-2 text-center">{bestArchetype.name}</h3>
          <p className="text-sm text-gray-500 mb-4 text-center">
            {bestArchetype.blurb}
            <br />
            {bestArchetype.tags?.map((tag) => `#${tag}`).join(" ")}
          </p>
        </hgroup>
      )}
      <div className="mb-4">
        <RadarChart width={800} height={400} data={combinedResultsForChart}>
          <PolarGrid />
          <PolarAngleAxis dataKey={"label"} />
          <PolarRadiusAxis angle={2} domain={[-100, 100]} />
          <Radar
            name="Your devValues"
            dataKey="value"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.4}
          />
          {compareResults && (
            <Radar
              name="Compared devValues"
              dataKey="compareValue"
              stroke="#82ca9d"
              fill="#82ca9d"
              fillOpacity={0.4}
            />
          )}
          <Legend />
        </RadarChart>
      </div>
      <div className="mb-4 flex flex-col items-center gap-2">
        <Button onClick={getResultsFromClipboard} color="green">
          Compare Results from Clipboard
        </Button>
        <Button onClick={saveResultsToClipboard}>
          Save Results to Clipboard
        </Button>
      </div>
      {badges.length > 0 && (
        <div className="flex items-center justify-center max-w-200 flex-wrap gap-2 my-4">
          {badges.map((badge) => (
            <span
              key={badge}
              className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded"
            >
              {badge}
            </span>
          ))}
        </div>
      )}
      <div className="mb-4 flex-col flex gap-1">
        {DEV_VALUES_AXES.map((axis) => (
          <div
            className="border-2 border-gray-300 rounded py-4 px-8"
            key={axis.id}
          >
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
                    width: `${(((state.result[axis.id] || 0) + axisSizes[axis.id]) * 100) / (axisSizes[axis.id] * 2)}%`,
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
      <div className="max-w-80">
        <Button onClick={restart}>Restart Questionnaire</Button>
      </div>
    </div>
  );
}
