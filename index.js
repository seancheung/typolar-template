const template = `
@set(mypos)
Reiciendis beatae beatae consequuntur et inventore numquam soluta voluptas. A non hic ut praesentium excepturi. Nemo ipsa qui suscipit. Dignissimos iusto et modi vero sequi. Sapiente aut facilis omnis autem distinctio sequi doloribus. Aut ut alias doloribus odio dolorem facere rerum sed.
 
Sint sed molestias dolorum ratione labore cumque nemo. Reiciendis necessitatibus qui eum repellendus. Laboriosam et illo nemo cupiditate porro dignissimos aut vel. Accusamus est sit voluptatibus inventore enim. Rem expedita nemo molestiae sit et ad enim harum et.
 
Dolor culpa provident ab. Magnam eum mollitia. Molestias quos dolor debitis enim eos doloremque numquam iusto. Omnis sunt laboriosam incidunt nesciunt ut enim. Laborum architecto nemo ut. Cupiditate illo omnis praesentium laudantium et iure reiciendis sit.
@end
@ref(mypos)
@ref(mypos)`;

console.log(require('./src/reference')(template));
