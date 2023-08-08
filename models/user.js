const dynamoose = require("dynamoose");

dynamoose.aws.sdk.config.update({
  region: "us-east-1",
});
const Schema = dynamoose.Schema;

const DYNAMODB_TABLE = "user";

const userSchema = new Schema(
  {
    id: {
      type: String,
      hashKey: true,
    },
    name: {
      type: String,
      required: true,
    },
    affiliations: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    interests: {
      type: Array,
      schema: [
        {
          type: Object,
          schema: {
            title: {
              type: String,
              required: true,
            },
            link: {
              type: String,
              required: true,
            },
            serpapiLink: {
              type: String,
              required: true,
            },
          },
        },
      ],
    },
    articles: {
      type: Array,
      schema: [
        {
          type: Object,
          schema: {
            title: {
              type: String,
              required: true,
            },
            link: {
              type: String,
              required: true,
            },
            citationId: {
              type: String,
              required: true,
            },
            authors: {
              type: String,
              required: true,
            },
            publication: {
              type: String,
              required: true,
            },
            conference: {
              type: String,
            },
            journal: {
              type: String,
            },
            citedBy: {
              type: Object,
              schema: {
                value: {
                  type: Number,
                },
                link: {
                  type: String,
                },
                serpapiLink: {
                  type: String,
                },
                citesId: {
                  type: String,
                },
              },
            },
            year: {
              type: Number,
              required: true,
            },
          },
        },
      ],
    },

    citedBy: {
      type: Object,
      schema: {
        table: {
          type: Object,
          schema: {
            citations: {
              type: Object,
              schema: {
                all: {
                  type: Number,
                  required: true,
                },
                since2017: {
                  type: Number,
                  required: true,
                },
              },
            },
            hIndex: {
              type: Object,
              schema: {
                all: {
                  type: Number,
                  required: true,
                },
                since2017: {
                  type: Number,
                },
              },
            },
            i10Index: {
              type: Object,
              schema: {
                all: {
                  type: Number,
                  required: true,
                },
                since2017: {
                  type: Number,
                  required: true,
                },
              },
            },
          },
        },
      },
    },
  },
  {
    useDocumentTypes: true,
    timestamps: true,
  }
);

const User = dynamoose.model(DYNAMODB_TABLE, userSchema);

module.exports = User;
