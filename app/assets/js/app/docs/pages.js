CAM_PAGES = [

  // engine api documentation

  { section: "implement", category: "Introduction", id: "bpmn-overview", name: "BPMN 2.0 Overview and Coverage", url: "/", keywords: "concept bpmn 2.0 introduction overview coverage" },
  { section: "implement", category: "Introduction", id: "extensions", name: "Custom Extensions", url: "/concepts/custom-extensions", keywords: "concept custom extensions" },
  { section: "implement", category: "Introduction", id: "listeners", name: "Listeners", url: "/concepts/listeners", keywords: "concept task execution listeners" },
  { section: "implement", category: "Tasks", id: "service-task", name: "Service Task", url: "/tasks/service-task", keywords: "tasks service task" },
  { section: "implement", category: "Tasks", id: "user-task", name: "User Task", url: "/tasks/user-task", keywords: "tasks user task" },
  { section: "implement", category: "Tasks", id: "script-task", name: "Script Task", url: "/tasks/script-task", keywords: "tasks script task" },
  { section: "implement", category: "Tasks", id: "business-rule-task", name: "Business Rule Task", url: "/tasks/business-rule-task", keywords: "tasks business rule task" },
  { section: "implement", category: "Tasks", id: "manual-task", name: "Manual Task", url: "/tasks/manual-task", keywords: "tasks manual task" },
  { section: "implement", category: "Tasks", id: "receive-task", name: "Receive Task", url: "/tasks/receive-task", keywords: "tasks receive task" },
  { section: "implement", category: "Tasks", id: "task-markers", name: "Task Markers (Multiple Instance, Loop and Compensation)", shortName: "Task Markers", url: "/tasks/task-markers", keywords: "tasks markers multiple instance loop compensation parallel sequential" },

  { section: "implement", category: "Gateways and Sequence Flows", id: "exclusive-gateway", name: "Exclusive Gateway (XOR)", url: "/gateways/exclusive-gateway", keywords: "exclusive gateways xor" },
  { section: "implement", category: "Gateways and Sequence Flows", id: "sequence-flow", name: "Conditional and default Sequence Flows", url: "/gateways/sequence-flow", keywords: "sequence flows conditional default" },
  { section: "implement", category: "Gateways and Sequence Flows", id: "parallel-gateway", name: "Parallel Gateway (AND)", url: "/gateways/parallel-gateway", keywords: "parallel gateways and" },
  { section: "implement", category: "Gateways and Sequence Flows", id: "inclusive-gateway", name: "Inclusive Gateway", url: "/gateways/inclusive-gateway", keywords: "inclusive gateways or" },
  { section: "implement", category: "Gateways and Sequence Flows", id: "event-based-gateway", name: "Event Based Gateway", url: "/gateways/event-based-gateway", keywords: "event based gateways" },

  { section: "implement", category: "Events", id: "events-overview", name: "Overview and Basic Concepts", shortName: "Events Overview", url: "/events/event-overview", keywords: "events event overview concept" },
  { section: "implement", category: "Events", id: "blank-event", name: "Blank Event", url: "/events/none-events", keywords: "events blank event" },
  { section: "implement", category: "Events", id: "message-event", name: "Message Event", url: "/events/message-events", keywords: "events message event" },
  { section: "implement", category: "Events", id: "timer-event", name: "Timer Event", url: "/events/timer-events", keywords: "events timer event" },
  { section: "implement", category: "Events", id: "error-event", name: "Error Event", url: "/events/error-events", keywords: "events error event" },
  { section: "implement", category: "Events", id: "signal-event", name: "Signal Event", url: "/events/signal-events", keywords: "events signal event" },
  { section: "implement", category: "Events", id: "compensation-event", name: "Compensation Event", url: "/events/cancel-and-compensation-events", keywords: "events compensation event" },

  { section: "implement", category: "Subprocesses", id: "embedded-subprocess", name: "Embedded Subprocess", url: "/subprocesses/embedded-subprocess", keywords: "subprocesses embedded subprocess" },
  { section: "implement", category: "Subprocesses", id: "call-activity", name: "Call Activity", url: "/subprocesses/call-activity", keywords: "subprocesses call activity" },
  { section: "implement", category: "Subprocesses", id: "event-subprocess", name: "Event Subprocess", url: "/subprocesses/event-subprocess", keywords: "subprocesses event subprocess" },
  { section: "implement", category: "Subprocesses", id: "transaction-subprocess", name: "Transaction Subprocess", url: "/subprocesses/transaction-subprocess", keywords: "subprocesses transaction subprocess" },
  
  { section: "rest", category: "Overview", id: "rest-introduction", name: "Introduction", url: "/overview/introduction", keywords: "rest overview" },
  
  { section: "rest", category: "Process Definition", id: "get-definition", name: "Get Single Definition", url: "/process-definition/get", keywords: "definition get process-definition" },
  { section: "rest", category: "Process Definition", id: "get-definitions", name: "Get Definitions", url: "/process-definition/get-query", keywords: "definitions get process-definition query filter" },
  { section: "rest", category: "Process Definition", id: "get-definitions-count", name: "Get Definitions Count", url: "/process-definition/get-query-count", keywords: "definitions get process-definition query filter count" },
  { section: "rest", category: "Process Definition", id: "get-definition-xml", name: "Get BPMN 2.0 XML", url: "/process-definition/get-xml", keywords: "definition get process-definition xml bpmn 2.0 2" },
  { section: "rest", category: "Process Definition", id: "post-start-process", name: "Start Process", url: "/process-definition/post-start-process", keywords: "definition post process-definition start instance" },
  { section: "rest", category: "Process Definition", id: "get-statistics", name: "Get Process Instance Statistics", url: "/process-definition/get-statistics", keywords: "definitions get process-definition instance statistics aggregate sum" },
  { section: "rest", category: "Process Definition", id: "get-activity-statistics", name: "Get Activity Instance Statistics", url: "/process-definition/get-activity-statistics", keywords: "definitions get process-definition activity statistics aggregate sum" },
  { section: "rest", category: "Process Definition", id: "get-start-form-key", name: "Get Start Form Key", url: "/process-definition/get-start-form-key", keywords: "definition get process-definition startForm start form key" },
  
  { section: "rest", category: "Process Instance", id: "get-instances", name: "Get Instances", url: "/process-instance/get-query", keywords: "instances get process-instance query filter" },
  { section: "rest", category: "Process Instance", id: "get-instances-count", name: "Get Instances Count", url: "/process-instance/get-query-count", keywords: "instances get process-instance query filter count" },
  { section: "rest", category: "Process Instance", id: "post-instances", name: "Get Instances (POST)", url: "/process-instance/post-query", keywords: "instances post process-instance query filter" },
  { section: "rest", category: "Process Instance", id: "post-instances-count", name: "Get Instances Count (POST)", url: "/process-instance/post-query-count", keywords: "instances post process-instance query filter count" },
  { section: "rest", category: "Process Instance", id: "get-instance-variables", name: "Get Process Variables", url: "/process-instance/get-variables", keywords: "instances get process-instance variables" },
  
  { section: "rest", category: "Task", id: "get-task", name: "Get Single Task", url: "/task/get", keywords: "task get" },
  { section: "rest", category: "Task", id: "get-tasks", name: "Get Tasks", url: "/task/get-query", keywords: "tasks get task filter query" },
  { section: "rest", category: "Task", id: "get-tasks-count", name: "Get Tasks Count", url: "/task/get-query-count", keywords: "tasks get task filter query count" },
  { section: "rest", category: "Task", id: "post-tasks", name: "Get Tasks (POST)", url: "/task/post-query", keywords: "tasks post task filter query" },
  { section: "rest", category: "Task", id: "post-tasks-count", name: "Get Tasks Count (POST)", url: "/task/post-query-count", keywords: "tasks post task filter query count" },
  { section: "rest", category: "Task", id: "get-form-key", name: "Get Form Key", url: "/task/get-form-key", keywords: "tasks get task form key" },
  { section: "rest", category: "Task", id: "post-claim", name: "Claim Task", url: "/task/post-claim", keywords: "tasks post task claim" },
  { section: "rest", category: "Task", id: "post-unclaim", name: "Unclaim Task", url: "/task/post-unclaim", keywords: "tasks post task unclaim" },
  { section: "rest", category: "Task", id: "post-complete", name: "Complete Task", url: "/task/post-complete", keywords: "tasks post task complete variables" },
  { section: "rest", category: "Task", id: "post-resolve", name: "Resolve Task", url: "/task/post-resolve", keywords: "tasks post task resolve variables" },
  { section: "rest", category: "Task", id: "post-delegate", name: "Delegate Task", url: "/task/post-delegate", keywords: "tasks post task delegate assignee" },
  { section: "rest", category: "Task", id: "get-group-info", name: "Get a User's Groups", url: "/task/get-group-info", keywords: "tasks get task groups user" },
];