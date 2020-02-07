export default function makeHttpResult({ statusCode, resultMessage }) {
  return {
    headers: {
      'Content-Type': 'application/json'
    },
    statusCode: statusCode,
    data: JSON.stringify(resultMessage)
  }
}