-- Task DB-sql

CREATE TABLE IF NOT EXISTS "Messages" (
    "id" SERIAL PRIMARY KEY,
	"sender" INTEGER REFERENCES "Users"(id) NOT NULL,
	"conversation" INTEGER REFERENCES "Conversations"(id) NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
    "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS "Conversations" (
    "id" SERIAL PRIMARY KEY,
    "participant_1" INTEGER REFERENCES "Users"(id) NOT NULL,
    "participant_2" INTEGER REFERENCES "Users"(id) NOT NULL,
    "blackList_1" BOOLEAN DEFAULT FALSE,
    "blackList_2" BOOLEAN DEFAULT FALSE,
    "favoriteList_1" BOOLEAN DEFAULT FALSE,
    "favoriteList_2" BOOLEAN DEFAULT FALSE,
	"createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
    "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS "Catalogs" (
    "id" SERIAL PRIMARY KEY,
	"userId" INTEGER REFERENCES "Users"(id),
    "catalogName" VARCHAR(255) 
);

CREATE TABLE IF NOT EXISTS "CatalogToConversations" (
    "id" SERIAL PRIMARY KEY,
	"catalogId" INTEGER REFERENCES "Catalogs"(id),
    "conversationId" INTEGER REFERENCES "Conversations"(id) 
);