# Gum Drops website

The open-source Astro landing site for Gum Drops. Deployment uses Cloudflare Workers Static Assets. Roadmap cards link to GitHub issues, where visitors can sign in and add thumbs-up reactions.

## Development

```sh
npm ci
npm run dev
```

## Check and deploy

```sh
npm run build
npm run preview
npm run deploy
```

Preview runs Wrangler locally. Deploy requires Cloudflare authentication. No database or application secrets are needed.

Edit the roadmap cards in `src/data/stories.json`. Each card must link to a real issue. See `PROPOSAL.md` for the scope and positioning.

Clone Gum Drops with `git clone --recurse-submodules`, or run `git submodule update --init` in an existing checkout.
