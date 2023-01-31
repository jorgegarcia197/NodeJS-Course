const API_BASE_URL = "http://localhost:8000";

async function httpGetPlanets() {
  // Load planets and return as JSON.
  const response = await fetch(`${API_BASE_URL}/planets`);
  console.log(response);
  return await response.json();
}

async function httpGetLaunches() {
  // Load launches, sort by flight number, and return as JSON.
  const response = await fetch(`${API_BASE_URL}/launches`);
  const fetchedLaunches = await response.json();
  return fetchedLaunches.sort((a, b) => {
    return a.flightNumber - b.flightNumber;
  });
}

async function httpSubmitLaunch(launch) {
  try {
    return await fetch(`${API_BASE_URL}/launches`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(launch),
    });
  } catch (error) {
    return {
      ok: false,
    };
  }

  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
  try {
    return await fetch(`${API_BASE_URL}/launches/${id}`, {
      method: "delete",
    });
  } catch (error) {
    return {
      ok: false,
    };
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
