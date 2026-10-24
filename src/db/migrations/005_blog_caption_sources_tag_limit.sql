-- Columns already used by the app but missing from 002.
ALTER TABLE blog ADD COLUMN IF NOT EXISTS cover_image_caption TEXT;
ALTER TABLE blog ADD COLUMN IF NOT EXISTS sources JSONB;

-- Blog convention: an article has at most 3 tags.
ALTER TABLE blog ADD CONSTRAINT blog_max_3_tags CHECK (cardinality(tags) <= 3);
