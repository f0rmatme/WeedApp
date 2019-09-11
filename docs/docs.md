# Docs

## GET /weed

OPTIONAL BODY: {
pagination: {
perPage: INTEGER,
page: INTEGER
},
filter: {
company: STRING,
type: STRING [Sativa, Indica, Hybrid, Terpenes],
thc: "dom",
cbd: "dom"
}
}

The thc and cbd specify if you want cbd or thc dominant results.
YOU MAY ONLY USE ONE OR THE OTHER NOT BOTH!
