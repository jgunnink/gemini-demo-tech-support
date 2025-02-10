import { expect } from "chai";
import { aiTechSupport } from "../src/index";
import { Request, Response } from "express";
import sinon from "sinon";
import {
  BatchEmbedContentsRequest,
  BatchEmbedContentsResponse,
  CachedContent,
  ChatSession,
  EmbedContentRequest,
  EmbedContentResponse,
  GenerativeModel,
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
  Part,
  SingleRequestOptions,
} from "@google/generative-ai";

interface testObject {
  args: Partial<Request>;
  expected: any;
  statusCode?: number;
}

describe("aiTechSupport", () => {
  let sandbox: sinon.SinonSandbox;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });

  describe("when a message is not provided", () => {
    const tests: testObject[] = [
      { args: { body: { message: "" } }, expected: "No message provided", statusCode: 400 },
      { args: { body: { message: undefined } }, expected: "No message provided", statusCode: 400 },
      { args: { body: {} }, expected: "No message provided", statusCode: 400 },
      { args: { body: { otherKey: "What?" } }, expected: "No message provided", statusCode: 400 },
    ];

    tests.forEach(({ args, expected, statusCode }) => {
      it(`returns "${expected}" and status ${statusCode} when request body is ${JSON.stringify(args.body)}`, async () => {
        const mockRes = {
          send: sinon.stub(),
          statusCode: 0,
          setHeader: sinon.stub(),
        };

        const result = await aiTechSupport(args as Request, mockRes as unknown as Response);

        expect(result).to.deep.equal(expected);
        expect(mockRes.send.calledWith(expected)).to.be.true;
        expect(mockRes.statusCode).to.equal(statusCode);
      });
    });
  });

  describe("when a valid message is provided", () => {
    const tests: testObject[] = [
      {
        args: { body: { message: "My computer is slow" } },
        expected: "Here are some troubleshooting steps:\n1. ...", // Mock AI response
      },
    ];

    tests.forEach(({ args, expected }) => {
      it(`returns AI response "${expected}" when request body is ${JSON.stringify(args.body)}`, async () => {
        const mockGenerativeModel = {
          generateContent: sandbox.stub().resolves({
            response: { text: () => expected },
          }),
        };
        sandbox.stub(GoogleGenerativeAI.prototype, "getGenerativeModel").returns(mockGenerativeModel as unknown as GenerativeModel);

        const mockRes = {
          send: sinon.stub(),
          statusCode: 0,
          setHeader: sinon.stub(),
        };

        const result = await aiTechSupport(args as Request, mockRes as unknown as Response);

        expect(result).to.deep.equal(expected);
        expect(mockRes.send.calledWith(expected)).to.be.true;
        expect(mockRes.statusCode).to.equal(200);
      });
    });
  });
});
