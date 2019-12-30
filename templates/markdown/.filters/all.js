module.exports = ({ Nunjucks, OpenAPISampler, Markdown }) => {

  Nunjucks.addFilter('log', anything => {
    console.log(anything);
  });

  Nunjucks.addFilter('tree', path => {
    const filteredPaths = path.split('.').filter(Boolean);
    if (!filteredPaths.length) return;
    const dottedPath = filteredPaths.join('.');

    return `${dottedPath}.`;
  });

  Nunjucks.addFilter('buildPath', (propName, path) => {
    if (!path) return propName;
    return `${path}.${propName}`;
  });

  Nunjucks.addFilter('isRequired', (obj, key) => {
    return obj && Array.isArray(obj.required) && !!(obj.required.includes(key));
  });

  Nunjucks.addFilter('acceptedValues', items => {
    if (!items) return '<em>Any</em>';

    return items.map(i => `<code>${i}</code>`).join(', ');
  });

  Nunjucks.addFilter('markdown2html', (md) => {
    return Markdown().render(md || '');
  });

  Nunjucks.addFilter('firstKey', (obj) => {
    if (!obj) return '';
    return Object.keys(obj)[0];
  });

  Nunjucks.addFilter('getPayloadExamples', (msg) => {
    if (Array.isArray(msg.examples()) && msg.find(e => e.payload)) {
      return msg.filter(e => e.payload);
    }

    if (msg.payload() && msg.payload().examples()) {
      return msg.payload().examples();
    }
  });

  Nunjucks.addFilter('getHeadersExamples', (msg) => {
    if (Array.isArray(msg.examples()) && msg.find(e => e.headers)) {
      return msg.filter(e => e.headers);
    }

    if (msg.headers() && msg.headers().examples()) {
      return msg.headers().examples();
    }
  });

  Nunjucks.addFilter('generateExample', (schema) => {
    return JSON.stringify(OpenAPISampler.sample(schema) || '', null, 2);
  });

  function objSerialize(obj) {
    return Object.keys(obj).map(k => `${k}: ${obj[k]}`).join("; ");
  };

  function queueSerialize(queues) {
    return Object.keys(queues).map(k => `${k}: [${objSerialize(queues[k])}]`).join("; ");
  }

  Nunjucks.addFilter('showTopicDetails', (channel) => {
    if(channel && channel._json && channel._json.bindings && channel._json.bindings.amqp && channel._json.bindings.amqp.is && channel._json.bindings.amqp.exchange && channel._json.bindings.amqp.is === "routingKey") {
      return `${objSerialize(channel._json.bindings.amqp.exchange)}`;
    } else {
      return "";
    }
    
  });

  Nunjucks.addFilter('showQueueDetails', (channel) => {
    if(channel && channel._json && channel._json.bindings && channel._json.bindings.amqp && channel._json.bindings.amqp.queues) {
      return `${queueSerialize(channel._json.bindings.amqp.queues)}`;
    } else {
      return "";
    }    
  });

  Nunjucks.addFilter('jsonStringify', (obj) => {
    return JSON.stringify(obj);
  });
};
