import * as dayjs from 'dayjs';

export default function postCollection(nodes) {
    return nodes.reduce((days, { node }) => {
        const created = dayjs(node.frontmatter.created),
            date = created.format('dddd, MMMM D, YYYY');

        let dateidx = days.findIndex(day => day.date === node.fields.date);

        if (-1 === dateidx) {
            dateidx = days.length;
            days.push({
                title: date,
                date: node.fields.date,
                notes: [],
                articles: []
            });
        }

        if ('' === node.frontmatter.title) {
            days[dateidx].notes.push(node);
        } else {
            days[dateidx].articles.push(node);
        }

        return days;
    }, []);
}
