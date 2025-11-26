let score = {
  runs: 0,
  balls: 0,
  wickets: 0
};

function oversFromBalls(balls) {
  return `${Math.floor(balls / 6)}.${balls % 6}`;
}

export async function GET() {
  return Response.json(score);
}

export async function POST(req) {
  const { action } = await req.json();

  switch (action) {
    case "1":
    case "2":
    case "4":
    case "6":
      score.runs += parseInt(action);
      score.balls++;
      break;

    case "no-ball":
      score.runs += 1;
      break;

    case "wide":
      score.runs += 1;
      break;

    case "wicket":
      score.wickets += 1;
      score.balls++;
      break;

    case "reset":
      score = { runs: 0, balls: 0, wickets: 0 };
      break;
  }

  return Response.json({
    ...score,
    overs: oversFromBalls(score.balls),
  });
}
