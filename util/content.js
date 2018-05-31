import * as contentful from "contentful";

const space = "eqa5o51sa0ei";
const accessToken =
  "95150a7b67bd186f2d0d1b3c9b22f77af08afaafbd897507cc249b8e2d354205";

const client = contentful.createClient({
  space,
  accessToken
});

const getContentType = type =>
  client
    .getEntries({
      content_type: type
    })
    .then(res => res.items);

const getPost = slug =>
  client
    .getEntries({
      content_type: "post",
      "fields.slug[in]": slug
    })
    .then(posts => (posts.total > 0 ? posts.items[0] : undefined));

export default {
  getPosts: () => getContentType("post"),
  getPost: slug => getPost(slug),
  getProjects: () => getContentType("project")
};
