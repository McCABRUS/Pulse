import {
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import { getProject } from "@/application/queries/getProject";
import { projects } from "@/infrastructure/data/projects";
import { InMemoryProjectRepository } from "@/infrastructure/repositories/InMemoryProjectRepository";

const repository = new InMemoryProjectRepository(projects);

const QualityScoreType = new GraphQLObjectType({
  name: "QualityScore",
  fields: {
    score: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
});

const AuditType = new GraphQLObjectType({
  name: "Audit",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    projectId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
    },
    overallScore: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    performance: {
      type: new GraphQLNonNull(QualityScoreType),
    },
    accessibility: {
      type: new GraphQLNonNull(QualityScoreType),
    },
    apiHealth: {
      type: new GraphQLNonNull(QualityScoreType),
    },
  },
});

const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    latestAudit: {
      type: AuditType,
    },
  },
});

const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    project: {
      type: ProjectType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: async (_source, args) => {
        const result = await getProject(repository, String(args.id));

        if (result.status === "not-found") {
          return null;
        }

        return result.project;
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: QueryType,
});
