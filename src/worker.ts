import { runScheduledFormMaintenance } from "./lib/server/form-submissions";

type Environment = Pick<CloudflareEnv, "FORM_DB" | "RESEND_API_KEY" | "FORM_FROM_EMAIL">;

export default {
  scheduled(
    _controller: ScheduledController,
    env: Environment,
    context: ExecutionContext,
  ) {
    context.waitUntil(runScheduledFormMaintenance(env));
  },
};
