{% from "./message.md" import message %}

{% macro operation(op, channelName, chan) %}
### {% if op.isPublish() %} `publish`{%- endif %}{%- if op.isSubscribe() %} `subscribe`{%- endif %} {{channelName}}
### `Topic` {{ chan | showTopicDetails}}
### `Queue Details` {{ chan | showQueueDetails}}

#### Message

{% if op.hasMultipleMessages() %}
Accepts **one of** the following messages:

{%- for msg in op.messages() -%}
##### Message #{{loop.index}}
{{ message(msg) }}
{%- endfor -%}
{% else %}
{{- message(op.message(0)) -}}
{% endif %}
{% endmacro %}
