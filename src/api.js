export function fetchMainData() {
  let idPromise = fetchId();
  return {
    id: wrapPromise(idPromise),
  };
}

function wrapPromise(promise) {
  let status = "pending";
  let result;
  let suspender = promise.then(
    (r) => {
      status = "success";
      result = r;
    },
    (e) => {
      status = "error";
      result = e;
    }
  );
  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    }
  };
}

function fetchId() {
  return fetch('https://api.ipify.org?format=json')
      .then((response) => response.json())
}
