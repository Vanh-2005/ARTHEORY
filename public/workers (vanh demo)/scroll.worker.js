self.onmessage = function(e) {
  const { scrollY, docHeight } = e.data;
  const progress = (scrollY / docHeight) * 100;
  self.postMessage({ progress });
};