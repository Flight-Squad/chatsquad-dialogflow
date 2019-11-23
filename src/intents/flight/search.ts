async function enqueueSearch(data) {
  // TODO
}

async function onSearch(agent, data) {
  await enqueueSearch(data);
  agent.add('Aight, we on it.');
}

export default onSearch;
