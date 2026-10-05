# Gum Drops website proposal

Build a small public site that explains Gum Drops, gets developers to a working installation and invites them to shape the roadmap on GitHub.

## Positioning

Lead with ongoing local coding agents. Each agent has editable instructions and memory in files, focused threads and schedules. The host keeps running when the browser closes. Git snapshots make runs inspectable and reversible through the host and CLI.

The candy characters give agents a recognisable identity. Custom avatar generation is a proposed feature, not a shipping claim.

The clearest reasons to choose Gum Drops are control over the host, readable agent files, model-provider choice through Pi, Git history and open-source code. Local execution does not imply local inference. Model requests can leave the machine through the chosen provider.

Avoid unsupported claims about Dots or Grok Bot. Their supplied pages could not be retrieved during this build. Before publishing a named comparison, check current primary documentation and compare the same jobs, including setup effort and what Gum Drops lacks.

## First release

One landing page with a short explanation, a candy character, three concrete benefits, three real GitHub roadmap issues and the installation commands.

Voting happens on GitHub through thumbs-up reactions. Visitors sign in there. The site has no accounts, vote database or embedded OAuth flow. Cards link to the real issues. Do not show fabricated reaction counts.

## Implementation

Astro generates static HTML. Cloudflare Workers Static Assets serves the output. No Worker API or database is needed for this release.

Keep the site in a separate public Git repository, attached to Gum Drops as the website submodule. Give the site its own dependencies, lockfile, MIT licence and deployment configuration.

## Quality checks

Build successfully. Check the desktop and mobile layouts, keyboard focus, reduced motion, link destinations and readable copy. Verify the install commands against the product README. Keep roadmap work distinct from existing features.

## Deployment

Run npm ci, npm run build and npm run deploy inside the submodule using an authenticated Cloudflare account. The initial Workers name is gumdrops-website. A custom domain can be attached after the first deployment.
