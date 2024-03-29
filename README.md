This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Inspiration

https://pcmaffey.com/counting-ghosts

## Events to add

### A lot of running clubs...

- A run club that meets at the Downs on a Saturday? - could be this one: https://www.fergsrunclub.co.uk/get_involved
- A run club that meets in Bedminster near a brewery there as well - https://www.instagram.com/alpha.runclub/ - free
- Southville run club? - https://www.southvillerunningclub.co.uk/membership - 50p a go, slower runs seem good on the social side?
- Westbury Harriers? Mix of social / competitive runs? Seems more fitness orientated... Maybe list the slower sessions as social runs? Get in touch. https://groups.runtogether.co.uk/WestburyHarriersRunningClub/Runs

## Todo

- All pages use styles from Index.module.scss - update this to seperate out the different page styles, and create a consistent hero component that can be reused on different pages. Note the map hero has custom margin - so our hero should be able to accept a custom container class prop and pass that through?

- The font class should live in a seperate file to `_app` and then get imported into app and the BristolMap component.

- Add more events, then user testing, stakeholder interviews.
