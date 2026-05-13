"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

export function TrendScoreChart({ data }: { data: Array<{ name: string; score: number }> }) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e6e6e6" />
          <XAxis dataKey="name" tick={{ fontSize: 11 }} />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Bar dataKey="score" name="คะแนน" fill="#ff3d8b" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function EngagementChart({
  data
}: {
  data: Array<{ name: string; engagement: number; shareability: number }>;
}) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e6e6e6" />
          <XAxis dataKey="name" tick={{ fontSize: 11 }} />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="engagement" name="อัตราการมีส่วนร่วม (%)" stroke="#1f1d3d" strokeWidth={3} />
          <Line type="monotone" dataKey="shareability" name="คะแนนการแชร์ (%)" stroke="#ff3d8b" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
