# CS-Geni public demo

A small, public-facing demonstration of the CS-Geni mission: making computer science approachable from a learner’s first questions through professional growth.

The site is intentionally dependency-free and works as a static GitHub Pages project. It includes three beginner-readable interactive examples:

- values and variables;
- a step-by-step loop visualizer;
- a push/pop stack demonstration.

## What this repository is

- An original visual introduction to CS-Geni
- A lightweight place to explore accessible learning interactions
- A safe public surface for community feedback and contribution

## What this repository is not

This is **not** the CS-Geni production platform. It does not contain private curriculum, proprietary business logic, backend services, production configuration, learner data, credentials, or code copied from private repositories.

## Run locally

No install or build step is required. Either open `index.html` directly or serve the directory with any static web server:

```bash
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

Node.js 20 or newer is required only for the automated checks:

```bash
npm test
npm run check
```

## Deploy to GitHub Pages

The included Pages workflow deploys the repository as a static site when changes land on `main`.

1. Open the repository’s **Settings → Pages**.
2. Under **Build and deployment**, choose **GitHub Actions** as the source.
3. Push or merge a change to `main`, or run the workflow manually.

The workflow uploads only the public static files required by the demo.

## Contributing

Issues and pull requests that improve clarity, accessibility, visual polish, or the small public demos are welcome. Keep changes focused, beginner-friendly, dependency-light, and suitable for a fully public repository. Run `npm run check` before submitting a pull request.

By contributing, you agree that your contribution may be distributed under the MIT License.

## Privacy and security

**Never submit secrets, credentials, personal learner data, private curriculum, proprietary material, production configuration, or implementation copied from private CS-Geni systems.** Treat every commit, issue, build log, and pull request in this repository as public.

If you believe you found a security issue, do not include sensitive exploit details or real credentials in a public issue. Contact the project maintainers privately through an appropriate organization channel.

## License

Original demo code in this repository is available under the [MIT License](LICENSE).
