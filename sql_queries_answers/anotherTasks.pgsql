-- db-nosql

db.messages.aggregate([{$match:{body:/паровоз/i}},{$count:"всего"}]);

-- task2
SELECT role, COUNT(*) as count FROM "Users" GROUP BY role;

--task 3

CREATE VIEW summaryPrize AS
SELECT sum("Contests"."prize") as sumPrize, "Contests"."userId"
FROM "Contests"
JOIN "Users" ON "Contests"."userId" = "Users"."id"
WHERE "Contests"."createdAt" BETWEEN '2023-04-01' and '2023-04-15' 
AND "Users"."role" = 'customer'
GROUP BY "Contests"."userId";



UPDATE "Users"
SET balance = balance + summaryprize.sumPrize * 0.1
FROM "summaryprize"
WHERE "Users"."id" = "summaryprize"."userId";

DROP VIEW summaryPrize;

--task 4

UPDATE "Users"
SET balance = balance + 10
WHERE rating IN (
  SELECT rating 
  FROM "Users"
  WHERE role = 'creator'
  ORDER BY rating DESC LIMIT 3
);